import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { Media } from 'present-core/api/websocket/screen';
import { nextSlide, previousSlide } from 'present-core/api/websocket/revealjs';

export function initialize(store: Store<State>) {
	const { get, path } = store;
	// connect the store to aframe to sync state
	store.onChange(path('space', 'sky'), () => {
		setSkyColor(get(path('space', 'sky', 'color')));
	});

	store.onChange(path('space', 'screen', 'source'), () => {
		setScreenMedia(get(path('space', 'screen', 'source')));
	});

	// Attach event handlers to Aframe
	initializeHandlers();

	// Wait for Aframe to load before continuing
	const scene = document.querySelector('a-scene');

	return scene ? ((scene as any).hasLoaded ? Promise.resolve() : new Promise((resolve) => {
		scene.addEventListener('loaded', resolve);
	})) : Promise.reject();

	// TODO load the tracked initial values in to the store
}

function initializeHandlers() {
	// const leftHand = document.getElementById('leftControl');
	const rightHand = document.getElementById('rightControl');

	rightHand?.addEventListener('abuttondown', () => {
		nextSlide({});
	});
	rightHand?.addEventListener('bbuttondown', () => {
		previousSlide({});
	});
	// TODO track pose when connected && is presenter
}

export function snackbar(message: string, timeout: number = 3000) {
	const textNode = document.querySelector('a-text');
	textNode?.setAttribute('value', message);
	setTimeout(() => {
		const currentValue = textNode?.getAttribute('value');
		if (currentValue === message) {
			textNode?.removeAttribute('value');
		}
	}, timeout);
}

function setSkyColor(color: string) {
	const sky = document.querySelector('a-sky');
	sky?.setAttribute('color', color);
}

function setScreenMedia(media?: Media) {
	const screen = document.querySelector('a-plane');
	if (!screen) {
		return;
	}
	if (!media) {
		screen.removeAttribute('material');
		screen.setAttribute('color', '#000');
		return;
	}
	else {
		screen.removeAttribute('color');
	}

	switch (media.type) {
		case 'slide':
			screen.setAttribute('material', `src: url(${media.src});npot: true`);
			screen.removeAttribute('color');
			break;
		case 'image':
			screen.setAttribute('material', `src: url(${media.src});npot: true`);
			break;
		case 'video':
			screen.setAttribute('material', `src: url(${media.src})`);
	}
}
