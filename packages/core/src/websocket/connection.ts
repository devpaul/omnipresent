import { getWebSocketServer } from "../config";
import { wait } from "../util/websocket";

let socket: WebSocket | undefined;
const handlerMap = new Map<string, MessageHandler<Message>>();

export interface Message {
	action: string;
}

export type MessageHandler<T extends Message = Message> = (this: WebSocket, message: T) => void;

function isMessage(value: any): value is Message {
	return value && typeof value === 'object' && typeof value.action === 'string';
}

/**
 * Handles incoming message
 */
function messageHandler(this: WebSocket, event: MessageEvent) {
	const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
	if (isMessage(message)) {
		const handler = handlerMap.get(message.action);
		handler && handler.call(this, message);
	}
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

export async function send(request: Message) {
	const data = JSON.stringify(request);
	const ws = await wait(socket);

	ws.send(data);
}

export function addMessageHandler<T extends Message = Message>(action: string, handler: MessageHandler<T>) {
	handlerMap.set(action, handler as MessageHandler);
}

export function addRawHandler(handler: (event: MessageEvent) => void) {
	if (!socket) {
		throw new Error('No Connection');
	}

	socket.addEventListener('message', handler);

	const s = socket;
	return {
		destroy() {
			s.removeEventListener('message', messageHandler);
		}
	}
}
