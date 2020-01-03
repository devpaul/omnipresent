import { send } from "src/websocket/connection";

export type Role = 'presenter' | 'sharer' | 'viewer';

export function authenticate(socket: WebSocket, role: Role, credentials: string) {
	const request = {
		role,
		credentials
	};
	return send(request);
	// TODO listen and parse response with timeout
}
