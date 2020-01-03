import { getWebSocketServer } from "../config";
import { wait } from "../util/websocket";
import { v4 as uuid } from 'uuid';

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

export type WebSocketData = string | ArrayBuffer | Blob | ArrayBufferView;

export async function sendRaw(data: WebSocketData) {
	if (!socket) {
		throw new Error('No connection');
	}
	const ws = await wait(socket);
	ws.send(data);
	return socket;
}

export async function send(request: object) {
	const data = JSON.stringify({
		requestId: uuid(),
		...request
	});
	const ws = await wait(socket);

	ws.send(data);
}

export async function handle<T>(type: string, handler: (data: T) => void) {
	if (!socket) {
		throw new Error('No Connection');
	}

	const messageHandler = (event: MessageEvent) => {
		if (event?.data.type === type) {
			handler(event.data);
		}
	}

	socket.addEventListener('message', messageHandler);

	return {
		destroy() {
			socket?.removeEventListener('message', messageHandler);
		}
	}
}
