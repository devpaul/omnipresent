import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { nextSlide, previousSlide, handleSlideChanged } from 'present-core/api/websocket/revealjs';
import { handleStatus, handleRoleConnected, handleRoleLeft, getStatus } from 'present-core/api/websocket/info';
import { connect, disconnect } from 'present-core/websocket/connection';
import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';

const commandFactory = createCommandFactory<State>();

const initializeRealtimeCommand = commandFactory<{ store: Store<State> }>(({ payload: { store }}) => {
	handleSlideChanged(({ h, v }) => {
		store.apply([
			replace(store.path('slide'), { h, v })
		], true);
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

export const initializeRealtimeProcess = createProcess('initialize-realtime', [ initializeRealtimeCommand ]);
export const connectProcess = createProcess('connect', [ connectCommand, getStatusCommand ]);
export const disconnectProcess = createProcess('disconnect', [ disconnectCommand ]);
export const nextSlideProcess = createProcess('disconnect', [ nextSlideCommand ]);
export const previousSlideProcess = createProcess('disconnect', [ previousSlideCommand ]);
export const getStatusProcess = createProcess('getStatus', [getStatusCommand]);
