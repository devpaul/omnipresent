export const enum WebSocketState {
	Connecting = 0,
	Open = 1,
	Closing = 2,
	Closed = 3
}

export function wait(socket?: WebSocket): Promise<WebSocket> {
	if (!socket) {
		return Promise.reject(new Error('not connected'));
	}
	switch (socket.readyState) {
		case WebSocketState.Connecting:
			return new Promise((resolve, reject) => {
				const onOpen = () => {
					resolve(socket);
					socket.removeEventListener('open', onOpen);
					socket.removeEventListener('error', reject);
					socket.removeEventListener('close', reject);
				}
				socket.addEventListener('open', onOpen);
				socket.addEventListener('error', reject);
				socket.addEventListener('close', reject);
			});
		case WebSocketState.Open:
			return Promise.resolve(socket);
		default:
			return Promise.reject(new Error('socket is closed'));
	}
}

export function is(socket: WebSocket, state: WebSocketState) {
	return socket.readyState === state;
}
