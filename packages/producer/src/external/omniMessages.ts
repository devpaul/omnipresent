import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';
import { uploadSlide } from 'present-core/api/upload';
import { handleAuthenticated, handleAuthenticateError } from 'present-core/api/websocket/authenticate';
import { handleRoleConnected, handleRoleLeft, handleStatus } from 'present-core/api/websocket/info';
import { handleSlideChanged } from 'present-core/api/websocket/revealjs';
import { getScreenshot } from 'present-core/webrtc/screen';

import { State } from '../interfaces';
import { setAuthenticatedProcess, setUnauthenticatedProcess } from '../processes/authenticate.process';

let store: Store<State>

export function initialize(s: Store<State>) {
	store = s;

	handleSlideChanged(async ({ h, v }) => {
		store.apply([
			replace(store.path('slide'), { h, v })
		], true);

		if (store.get(store.path('isSharing'))) {
			const dataUrl = await getScreenshot();
			const result = await uploadSlide(dataUrl, {
				deck: 'deck',
				indexh: h,
				indexv: v,
				type: 'png'
			});
			// TODO announce to viewers to use the snapshot
			console.log(result);
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
