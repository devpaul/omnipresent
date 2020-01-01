import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { wait } from '../utils/websocket';
import { replace } from '@dojo/framework/stores/state/operations';
import { getWebSocketServer } from '../config';

let socket: WebSocket | undefined;

const commandFactory = createCommandFactory<State>();

/**
 * Handles incoming realtime messages
 */
function messageHandler(event: any) {
	console.log('message', event);
}

const connectCommand = commandFactory(async ({ path, payload: { url = getWebSocketServer() }}) => {
	if (socket && socket.url.indexOf(url) === -1) {
		throw new Error(`Socket currently connected to ${ socket.url }. Cannot connect to ${ url } unless disconnected.`)
	}
	if (!socket) {
		socket = new WebSocket(url);
		socket.addEventListener('close', function () {
			this.removeEventListener('message', messageHandler);
			socket = undefined;
		});
		socket.addEventListener('error', (event) => {
			console.warn('websocket error', event);
		});
		socket.addEventListener('message', messageHandler);
	}

	await wait(socket);

	return [
		replace(path('isConnected'), true)
	]
});

const disconnectCommand = commandFactory(({ path }) => {
	if (socket) {
		socket.close();
		socket = undefined;
	}

	return [
		replace(path('isConnected'), false)
	];
});

export const connectProcess = createProcess('connect', [ connectCommand ]);
export const disconnectProcess = createProcess('disconnect', [ disconnectCommand ]);
