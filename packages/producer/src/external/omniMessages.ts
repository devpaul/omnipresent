import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';
import { handleAuthenticated, handleAuthenticateError } from 'present-core/api/websocket/authenticate';
import { handleRoleConnected, handleRoleLeft, handleStatus } from 'present-core/api/websocket/info';
import { handleSlideChanged } from 'present-core/api/websocket/revealjs';

import { State } from '../interfaces';
import { setAuthenticatedProcess, setUnauthenticatedProcess } from '../processes/authenticate.process';
import { captureSlideProcess, slideChangedProcess } from '../processes/slides.process';

let store: Store<State>

export function initialize(s: Store<State>) {
	store = s;

	handleSlideChanged(async ({ h, v }) => {
		await slideChangedProcess(store)({ h, v });
		const isSharing = store.get(store.path('isSharing'));
		const captureSlides = store.get(store.path('options', 'captureSlides'));

		if (captureSlides && isSharing) {
			await captureSlideProcess(store)({});
		}
	});

	handleStatus(({ roles, connectionCount }) => {
		const hasPresenter = roles.some(role => role === 'presenter');
		const hasSlides = roles.some(role => role === 'slides')
		store.apply([
			replace(store.path('stats', 'isPresenterConnected'), hasPresenter),
			replace(store.path('stats', 'areSlidesConnected'), hasSlides),
			replace(store.path('stats', 'connectionCount'), connectionCount)
		])
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
