import { once } from '/present-core/util/handlers';

export type TransitionCallback = (node: Element, event: SlideEvent) => void;

const transitionCallbacks: TransitionCallback[] = [];

export function addSlideTransitionListener(callback: TransitionCallback) {
	transitionCallbacks.push(callback);
}

function waitForTransition(node: Element) {
	return new Promise((resolve) => {
		once(node, 'transitionstart', () => {
			once(node, 'transitionend', () => {
				console.log('transition complete');
				resolve(node);
			});
		});
	});
}

Reveal.addEventListener('slidechanged', async (event) => {
	const slide = Reveal.getCurrentSlide();
	await waitForTransition(slide);
	for (let callback of transitionCallbacks) {
		callback(slide, event);
	}
});
