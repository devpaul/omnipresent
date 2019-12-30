export type TransitionCallback = (node: Element) => void;

const transitionCallbacks: TransitionCallback[] = [];

export function addSlideTransitionListener(callback: TransitionCallback) {
	transitionCallbacks.push(callback);
}

function once(target: Element, name: string, handler: () => void) {
	const wrapper = () => {
		handler();
		target.removeEventListener(name, wrapper);
	}
	target.addEventListener(name, wrapper);
}

function waitForTransition(node: Element) {
	return new Promise((resolve, reject) => {
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
		callback(slide);
	}
});
