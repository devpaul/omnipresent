import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { connect, disconnect } from 'present-core/websocket/connection';

import { State } from '../interfaces';
import { getStatus } from 'present-core/api/websocket/info';
import { setConnection } from '../external/connection';

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
	const socket = await connect();
	setConnection(socket);
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
