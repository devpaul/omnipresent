import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { add, replace } from '@dojo/framework/stores/state/operations';
import Store from '@dojo/framework/stores/Store';

import { initialize as initializeAframe } from '../external/aframe';
import { initialize as initializeConnection } from '../external/connection';
import { initialize as initializeOmni } from '../external/omnisockets';
import { State } from '../interfaces';
import { attemptAuthenticationProcess, loadSecretProcess } from '../processes/authenticate.process';
import { connectProcess } from '../processes/connection.process';

const commandFactory = createCommandFactory<State>();

const initialStateCommand = commandFactory(({ path }) => {
	return [
		add(path('space'), {
			sky: {
				color: '#191a47'
			},
			screen: {
				position: {
					x: 0,
					y: 2,
					z: -1.10276
				}
			}
		})
	];
});

const initialStateProcess = createProcess('initial', [initialStateCommand]);

function debug(store: Store<State>) {
	const global = (window as any);
	global.store = store;
	global.replace = replace;
}

export const store = createStoreMiddleware<State>(async (store: Store<State>) => {
	initialStateProcess(store)({});
	await loadSecretProcess(store)({});
	initializeOmni(store);
	initializeConnection(store);
	await initializeAframe(store);
	await connectProcess(store)({})
	await attemptAuthenticationProcess(store)({});

	debug(store);
});
