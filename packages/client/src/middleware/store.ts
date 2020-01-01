import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { add } from '@dojo/framework/stores/state/operations';
import { connectProcess } from '../process/realtime.process';

const commandFactory = createCommandFactory<State>();

const initialStateCommand = commandFactory(({ path }) => {
	return [
		add(path('space'), {
			sky: {
				color: '#191a47'
			},
			screen: {
				source: {
					type: 'image',
					url: '/samples/slide.png'
				},
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

export const store = createStoreMiddleware<State>((store: Store<State>) => {
	initialStateProcess(store)({});
	// TODO check for live presentation
	connectProcess(store)({});
	(window as any).store = store;
});
