/// <reference types="reveal" />
import { openMenu, closeMenu, connect } from './menu';
import { addSlideTransitionListener } from './slides';
import { getMenuCloseButton, getConnectButton, getAuthButton, getAuthInput } from './elements';
import { slideChanged } from '/present-core/api/websocket/revealjs'
import { authenticate } from '/present-core/api/websocket/authenticate'

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

// Initialize WebSockets

Reveal.addEventListener('ready', function (event) {
	connect();
});

document.addEventListener('keyup', (event) => {
	if (event.which === 77) {
		openMenu();
	}
});

getMenuCloseButton()?.addEventListener('click', closeMenu);

addSlideTransitionListener(async (node: Element, event: SlideEvent) => {
	console.log('transitioned');
	if (node !== Reveal.getCurrentSlide()) {
		console.warn('transitioned slide is not the current slide');
		return;
	}
	slideChanged({
		slide: Reveal.getIndices().h
	});
});

getConnectButton()?.addEventListener('click', async () => {
	connect();
});

getAuthButton()?.addEventListener('click', async () => {
	const secret = getAuthInput()?.value || '';
	authenticate({
		role: 'slides',
		secret
	})
});
