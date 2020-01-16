import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { Media } from 'present-core/api/websocket/screen';
import { nextSlide, previousSlide } from 'present-core/api/websocket/revealjs';
import { enterVrProcess, exitVrProcess } from '../processes/vr.process';
import { startSharingPose, stopSharingPose } from './aframe/pose';
import { snackbar } from './aframe/snackbar';
import { setPresenterSpace, setViewerSpace } from './aframe/space';

export function initialize(store: Store<State>) {
	const { get, path } = store;
	// connect the store to aframe to sync state
	store.onChange(path('space', 'sky'), () => {
		setSkyColor(get(path('space', 'sky', 'color')));
	});

	store.onChange(path('space', 'screen', 'source'), () => {
		const media = get(path('space', 'screen', 'source'));
		setScreenMedia('#screen', media);
		setScreenMedia('#presentScreen', media);
	});

	store.onChange(path('isPresenter'), () => {
		const isPresenter = get(path('isPresenter'));
		const isInVr = get(path('isInVr'));

		if (isPresenter) {
			setPresenterSpace();
			if (isInVr) {
				startSharingPose();
			}
		}
		else {
			setViewerSpace();
			stopSharingPose();
		}
	});

	store.onChange(path('isInVr'), () => {
		const isPresenter = get(path('isPresenter'));
		const isInVr = get(path('isInVr'));

		if (isPresenter && isInVr) {
			startSharingPose();
		}
		else {
			stopSharingPose();
		}
	});

	// Attach event handlers to Aframe
	initializeHandlers(store);

	// Wait for Aframe to load before continuing
	const scene = document.querySelector('a-scene');

	return scene ? ((scene as any).hasLoaded ? Promise.resolve() : new Promise((resolve) => {
		scene.addEventListener('loaded', resolve);
	})) : Promise.reject();

	// TODO load the tracked initial values in to the store
}

function initializeHandlers(store: Store<State>) {
	// const leftHand = document.getElementById('leftControl');
	const rightHand = document.getElementById('rightControl');
	const scene = document.querySelector('a-scene');

	rightHand?.addEventListener('abuttondown', () => {
		nextSlide({});
	});
	rightHand?.addEventListener('bbuttondown', () => {
		previousSlide({});
	});
	scene?.addEventListener('enter-vr', () => {
		enterVrProcess(store)({});
		snackbar('Welcome');
	});
	scene?.addEventListener('exit-vr', () => {
		exitVrProcess(store)({});
	});
}

function setSkyColor(color: string) {
	const sky = document.querySelector('a-sky');
	sky?.setAttribute('color', color);
}

function setScreenMedia(selector: string, media?: Media) {
	const screen = document.querySelector(selector);
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

export function setPresenterNotes(notes: string) {
	const txtNode = document.querySelector('#presenttxt');
	txtNode?.setAttribute('value', notes);
}
