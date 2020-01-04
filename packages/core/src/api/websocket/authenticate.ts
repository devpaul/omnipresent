import { send } from "src/websocket/connection";

export type Role = 'presenter' | 'sharer' | 'viewer';

export function authenticate(socket: WebSocket, role: Role, credentials: string) {
	// TODO implement
}
