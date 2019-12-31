/// <reference types="reveal" />
import { openMenu, setPreview } from './menu';
import { isConnected, getScreenshot, dataUrlToBlob } from './screen';
import { addSlideTransitionListener } from './slides';

declare const hljs: typeof import('highlight.js');

// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	width: '100%',
	height: '100%',

	transition: 'slide', // none/fade/slide/convex/concave/zoom

	// Optional reveal.js plugins
	dependencies: [
		{
			src: 'node_modules/reveal.js/lib/js/classList.js',
			condition: function () {
				return !document.body.classList;
			}
		},
		{
			src: 'node_modules/reveal.js/plugin/markdown/marked.js',
			condition: function () {
				return !!document.querySelector('[data-markdown]');
			}
		},
		{
			src: 'node_modules/reveal.js/plugin/markdown/markdown.js',
			condition: function () {
				return !!document.querySelector('[data-markdown]');
			}
		},
		{
			src: 'node_modules/reveal.js/plugin/highlight/highlight.js',
			async: true,
			condition: function () {
				return !!document.querySelector('pre code');
			},
			callback: function () {
				hljs.initHighlightingOnLoad();
			}
		},
		{
			src: 'node_modules/reveal.js/plugin/zoom-js/zoom.js',
			async: true
		},
		{
			src: 'node_modules/reveal.js/plugin/notes/notes.js',
			async: true
		}
	]
});

Reveal.addEventListener('ready', function (event) {
	openMenu();
});

addSlideTransitionListener(async (node: Element) => {
	if (node !== Reveal.getCurrentSlide()) {
		console.warn('transitioned slide is not the current slide');
		return;
	}
	if (isConnected()) {
		const url = await getScreenshot();
		setPreview(url);

		// upload screenshot to server
		const imageBlob = await dataUrlToBlob(url);
		var fd = new FormData();
		fd.append('upl', imageBlob, `slide-${Reveal.getProgress()}.png`);

		fetch('/upload/', {
			method: 'POST',
			body: fd
		});
		// TODO tell presenter to use screen
	}
})
