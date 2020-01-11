import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { getStatus } from 'present-core/api/websocket/info';
import { disconnect } from 'present-core/websocket/connection';

import { createConnection } from '../external/connection';
import { State } from '../interfaces';

const commandFactory = createCommandFactory<State>();

const setDisconnectedCommand = commandFactory(async ({ path }) => {
	return [
		replace(path('isConnected'), false)
	];
});

const setConnectedCommand = commandFactory(async ({ path }) => {
	return [
		replace(path('isConnected'), true)
	];
});

const connectCommand = commandFactory(async ({ path }) => {
	await createConnection((store) => {
		setDisconnectedProcess(store)({});
	});
});

const disconnectCommand = commandFactory(({ path }) => {
	disconnect();
});

const getStatusCommand = commandFactory(() => {
	getStatus({});
});

export const connectProcess = createProcess('connect', [ connectCommand, setConnectedCommand, getStatusCommand ]);
export const disconnectProcess = createProcess('disconnect', [ disconnectCommand, setDisconnectedCommand ]);
export const getStatusProcess = createProcess('getStatus', [getStatusCommand]);
export const setDisconnectedProcess = createProcess('setDisconnected', [setDisconnectedCommand]);
