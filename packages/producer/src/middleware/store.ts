import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { initializeRealtimeProcess, connectProcess, authenticateProcess } from '../processes/realtime.process';
import { loadSecretProcess } from '../processes/authenticate.process';

const commandFactory = createCommandFactory<State>();

const initialStateCommand = commandFactory(({ path }) => {
	return [
		replace(path('stats', 'connectionCount'), 0)
	]
});

const initialStateProcess = createProcess('initial', [initialStateCommand]);

export const store = createStoreMiddleware<State>(async (store: Store<State>) => {
	await initialStateProcess(store)({});
	await loadSecretProcess(store)({});
	await initializeRealtimeProcess(store)({ store });
	await connectProcess(store)({});

	const secret = store.get(store.path('auth', 'secret'));

	if (secret) {
		await authenticateProcess(store)({ secret });
	}
});
