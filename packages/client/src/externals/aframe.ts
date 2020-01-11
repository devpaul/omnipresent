import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { Media } from 'present-core/api/websocket/screen';

export function initialize(store: Store<State>) {
	const { get, path } = store;
	store.onChange(path('space', 'sky'), () => {
		setSkyColor(get(path('space', 'sky', 'color')));
	});

	store.onChange(path('space', 'screen', 'source'), () => {
		setScreenMedia(get(path('space', 'screen', 'source')));
	});

	const scene = document.querySelector('a-scene');

	return scene ? new Promise((resolve) => {
		scene.addEventListener('loaded', resolve);
	}) : Promise.reject();

	// TODO load the tracked initial values in to the store
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
