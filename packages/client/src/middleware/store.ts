import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { add, replace } from '@dojo/framework/stores/state/operations';
import { initialize as initializeOmni } from '../externals/omnisockets';
import { initialize as initializeConnection, getConnection } from '../externals/connection';
import { initialize as initializeAframe } from '../externals/aframe';

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
	// TODO load secret from localstorage
	initializeOmni(store);
	initializeConnection(store);
	await initializeAframe(store);
	await getConnection();

	const secret = store.get(store.path('auth', 'secret'));

	if (secret) {
		// TODO authenticate
	}

	debug(store);
});
