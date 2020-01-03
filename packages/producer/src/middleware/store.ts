import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import Store from '@dojo/framework/stores/Store';
import { State } from '../interfaces';
import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';

const commandFactory = createCommandFactory<State>();

const initialStateCommand = commandFactory(({ path }) => {
	return [
	]
});

const initialStateProcess = createProcess('initial', [initialStateCommand]);

export const store = createStoreMiddleware<State>((store: Store<State>) => {
	initialStateProcess(store)({});
});
