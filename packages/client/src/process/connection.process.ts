import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { State } from '../interfaces';
import { getStatus } from 'present-core/api/websocket/info';

const commandFactory = createCommandFactory<State>();

const isConnectedCommand = commandFactory(async ({ path }) => {
	return [
		replace(path('isConnected'), true)
	]
});

const isDisconnectedCommand = commandFactory(async ({ path }) => {
	return [
		replace(path('isConnected'), false)
	]
});

const getStatusCommand = commandFactory(() => {
	getStatus({});
});

export const isConnectedProcess = createProcess('isConnected', [ isConnectedCommand, getStatusCommand ]);
export const isDisconnectedProcess = createProcess('isDisconnected', [ isDisconnectedCommand ]);
