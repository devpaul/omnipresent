export const enum WebSocketState {
	Connecting = 0,
	Open = 1,
	Closing = 2,
	Closed = 3
}

export async function connect(uri: string) {
	const connection = new Promise((resolve, reject) => {
		const onOpen = () => {
			resolve;
			socket.removeEventListener('open', onOpen);
			socket.removeEventListener('error', reject);
			socket.removeEventListener('close', reject);
		}
		const socket = new WebSocket(uri);
		socket.addEventListener('open', onOpen);
		socket.addEventListener('error', reject);
		socket.addEventListener('close', reject);
	});
}

export function is(socket: WebSocket, state: WebSocketState) {
	return socket.readyState === state;
}

export function disconnect(socket: WebSocket) {
	socket.close();
}
