import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';
import { handleAuthenticated, handleAuthenticateError } from 'present-core/api/websocket/authenticate';
import { handleRoleConnected, handleRoleLeft, handleStatus } from 'present-core/api/websocket/info';
import { handleSlideChanged } from 'present-core/api/websocket/revealjs';
import { handleShowMedia } from 'present-core/api/websocket/screen';

import { State } from '../interfaces';
import { setAuthenticatedProcess, setUnauthenticatedProcess } from '../processes/authenticate.process';
import { captureSlideProcess, slideChangedProcess, displaySlideProcess } from '../processes/slides.process';
import { DECKNAME, IMAGETYPE, getSlideUrl } from '../config';
import { setScreenMediaProcess, publishSlideToScreenProcess } from '../processes/screen.process';

let store: Store<State>

export function initialize(s: Store<State>) {
	store = s;

	handleSlideChanged(async ({ h, v }) => {
		await slideChangedProcess(store)({ h, v });
		const isSharing = store.get(store.path('isSharing'));
		const captureSlides = store.get(store.path('options', 'captureSlides'));

		if (captureSlides && isSharing) {
			await captureSlideProcess(store)({});
			await displaySlideProcess(store)({ deck: DECKNAME, h, v, type: IMAGETYPE });
		}
		else {
			await publishSlideToScreenProcess(store)({
				type: 'slide',
				deck: DECKNAME,
				slide: { h, v },
				src: getSlideUrl(DECKNAME, h, v, IMAGETYPE)
			 });
		}
	});

	handleStatus(({ roles, connectionCount, screen, slide }) => {
		const { path } = store;
		const hasPresenter = roles.some(role => role === 'presenter');
		const hasSlides = roles.some(role => role === 'slides')
		store.apply([
			replace(path('stats', 'isPresenterConnected'), hasPresenter),
			replace(path('stats', 'areSlidesConnected'), hasSlides),
			replace(path('stats', 'connectionCount'), connectionCount),
			replace(path('screen'), screen),
			replace(path('slide'), slide)
		])
	});

	handleShowMedia((media) => {
		console.log('media', media)
		setScreenMediaProcess(store)(media);
	});

	handleRoleConnected(({ role }) => {
		switch (role) {
			case 'presenter':
				return [ replace(store.path('stats', 'isPresenterConnected'), true) ]
			case 'slides':
				return [ replace(store.path('stats', 'areSlidesConnected'), true) ]
		}
	});

	handleRoleLeft(({ role }) => {
		switch (role) {
			case 'presenter':
				return [ replace(store.path('stats', 'isPresenterConnected'), false) ]
			case 'slides':
				return [ replace(store.path('stats', 'areSlidesConnected'), false) ]
		}
	});

	handleAuthenticated(() => {
		setAuthenticatedProcess(store)({});
	});

	handleAuthenticateError(() => {
		setUnauthenticatedProcess(store)({})
	});
}
