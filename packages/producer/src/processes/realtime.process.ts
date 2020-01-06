import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { nextSlide, previousSlide, handleSlideChanged } from 'present-core/api/websocket/revealjs';
import { handleAuthenticateError, handleAuthenticated, authenticate } from 'present-core/api/websocket/authenticate';
import { handleStatus, handleRoleConnected, handleRoleLeft, getStatus } from 'present-core/api/websocket/info';
import { connect, disconnect } from 'present-core/websocket/connection';
import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';
import { getScreenshot } from 'present-core/webrtc/screen';
import { uploadSlide } from 'present-core/api/upload';

const commandFactory = createCommandFactory<State>();

const initializeRealtimeCommand = commandFactory<{ store: Store<State> }>(({ payload: { store }}) => {
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
		store.apply([
			replace(store.path('auth', 'isAuthenticated'), true)
		], true);
	});

	handleAuthenticateError(() => {
		store.apply([
			replace(store.path('auth', 'isAuthenticated'), false)
		], true);
	});
});

const nextSlideCommand = commandFactory(() => {
	nextSlide({});
});

const previousSlideCommand = commandFactory(() => {
	previousSlide({});
});

const connectCommand = commandFactory(async ({ path }) => {
	await connect();

	return [
		replace(path('isConnected'), true)
	]
});

const disconnectCommand = commandFactory(({ path }) => {
	disconnect();

	return [
		replace(path('isConnected'), false)
	];
});

const getStatusCommand = commandFactory(() => {
	getStatus({});
});

const authenticateCommand = commandFactory<{ secret: string }>(({ payload: { secret }}) => {
	authenticate({ role: 'producer', secret });
})

export const initializeRealtimeProcess = createProcess('initialize-realtime', [ initializeRealtimeCommand ]);
export const connectProcess = createProcess('connect', [ connectCommand, getStatusCommand ]);
export const disconnectProcess = createProcess('disconnect', [ disconnectCommand ]);
export const nextSlideProcess = createProcess('disconnect', [ nextSlideCommand ]);
export const previousSlideProcess = createProcess('disconnect', [ previousSlideCommand ]);
export const getStatusProcess = createProcess('getStatus', [getStatusCommand]);
export const authenticateProcess = createProcess('authenticate', [ authenticateCommand ]);
