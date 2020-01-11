import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';

import { initializeConnection } from '../external/connection';
import { initialize as initializeMessages } from '../external/omniMessages';
import { State } from '../interfaces';
import { attemptAuthenticationProcess, loadSecretProcess } from '../processes/authenticate.process';
import { connectProcess } from '../processes/connection.process';

const commandFactory = createCommandFactory<State>();

const initialStateCommand = commandFactory(({ path }) => {
	return [
		replace(path('stats', 'connectionCount'), 0),
		replace(path('options', 'syncToSlides'), true)
	];
});

const initialStateProcess = createProcess('initial', [initialStateCommand]);

export const store = createStoreMiddleware<State>(async (store: Store<State>) => {
	await initialStateProcess(store)({});
	await loadSecretProcess(store)({});
	initializeMessages(store);
	initializeConnection(store);
	await connectProcess(store)({});
	await attemptAuthenticationProcess(store)({});
});
