import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { State } from '../interfaces';
import { getStatus } from 'present-core/api/websocket/info';
import { Media } from 'present-core/api/websocket/screen';

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

const setSourceCommand = commandFactory<Media>(({ path, payload }) => {
	return [
		replace(path('space', 'screen', 'source'), payload)
	];
})

export const isConnectedProcess = createProcess('isConnected', [ isConnectedCommand, getStatusCommand ]);
export const isDisconnectedProcess = createProcess('isDisconnected', [ isDisconnectedCommand ]);
export const setSourceProcess = createProcess('set-source', [ setSourceCommand]);
