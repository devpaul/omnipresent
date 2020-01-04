import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { nextSlide, previousSlide, handleSlideChanged } from 'present-core/api/websocket/revealjs';
import { connect, disconnect } from 'present-core/websocket/connection';
import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';

const commandFactory = createCommandFactory<State>();

const initializeRealtimeCommand = commandFactory<{ store: Store<State> }>(({ payload: { store }}) => {
	handleSlideChanged(({ slide }) => {
		store.apply([
			replace(store.path('slide'), slide)
		], true);
	});
});

const nextSlideCommand = commandFactory(() => {
	nextSlide();
});

const previousSlideCommand = commandFactory(() => {
	previousSlide();
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

export const initializeRealtimeProcess = createProcess('initialize-realtime', [ initializeRealtimeCommand ]);
export const connectProcess = createProcess('connect', [ connectCommand ]);
export const disconnectProcess = createProcess('disconnect', [ disconnectCommand ]);
export const nextSlideProcess = createProcess('disconnect', [ nextSlideCommand ]);
export const previousSlideProcess = createProcess('disconnect', [ previousSlideCommand ]);
