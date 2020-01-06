import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { loadSecretProcess, authenticateProcess } from '../processes/authenticate.process';
import { initialize as initializeMessages } from '../external/omniMessages';
import { initializeConnection } from '../external/connection';
import { connectProcess } from '../processes/connection.process';

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
	initializeMessages(store);
	initializeConnection(store);
	await connectProcess(store)({});

	const secret = store.get(store.path('auth', 'secret'));

	if (secret) {
		await authenticateProcess(store)({ secret });
	}
});
