import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { initializeRealtimeProcess } from '../processes/realtime.process';

const commandFactory = createCommandFactory<State>();

const initialStateCommand = commandFactory(({ path }) => {
	return [
		replace(path('stats', 'connectionCount'), 0)
	]
});

const initialStateProcess = createProcess('initial', [initialStateCommand]);

export const store = createStoreMiddleware<State>((store: Store<State>) => {
	initialStateProcess(store)({});
	initializeRealtimeProcess(store)({ store });
});
