import { getWebSocketServer } from "../config";
import { wait } from "./websocket";

let socket: WebSocket | undefined;

/**
 * Handles incoming message
 */
function messageHandler(event: any) {
	console.log('message', event);
}

export function connect(url = getWebSocketServer()) {
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

	return wait(socket);
}

export function disconnect() {
	if (socket) {
		socket.close();
		socket = undefined;
	}
}

export function isConnected() {
	return socket && socket.readyState <= 1;
}

export async function send(data: string | ArrayBuffer | Blob | ArrayBufferView) {
	if (!socket) {
		throw new Error('No connection');
	}
	const ws = await wait(socket);
	ws.send(data);
}
