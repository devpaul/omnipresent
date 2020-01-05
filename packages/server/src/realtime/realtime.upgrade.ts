import { UpgradeMiddlewareFactory } from "webserv/src/core/interface";
import { websocket } from 'webserv/src/core/upgrades/websocket.upgrade';
import { log } from 'webserv/src/core/log';

export interface RealtimeUpgradeProperties {
	onInit?: (methods: ConnectionMethods) => void;
	onConnect?: (connection: Connection, methods: ConnectionMethods) => void;
	onDisconnect?: (connection: Connection, methods: ConnectionMethods) => void;
	onError?: (error: Error, connection: Connection | string) => void;
	onMessage?: (data: any, connection: Connection, methods: ConnectionMethods) => void;
}

export interface ConnectionMethods {
	get(socketId: string): Connection | undefined;
	getAll(): Iterable<Connection>;
	getSize(): number;
}

export class Connection {
	constructor(readonly id: string, readonly client: WebSocket) {}
}

export const realtimeUpgrade: UpgradeMiddlewareFactory<RealtimeUpgradeProperties> = ({
	onInit,
	onConnect,
	onDisconnect,
	onError,
	onMessage
}) => {
	const connections: Map<string, Connection> = new Map();

	const methods: ConnectionMethods = {
		get(socketId) {
			return connections.get(socketId);
		},
		getAll() {
			return connections.values();
		},
		getSize() {
			return connections.size;
		}
	};

	onInit && onInit(methods)

	return websocket({
		onClose(socketId, code, reason) {
			log.debug(`[WS] {${socketId}} connection closed (${code}).${reason ? ` Reason: ${reason}` : ''}`);
			const con = connections.get(socketId);

			if (con) {
				connections.delete(socketId);
				onDisconnect?.(con, methods);
			} else {
				log.warn(`[WS] Unregistered user ${socketId} closed connection!`);
			}
		},
		onConnection(client, socketId) {
			log.debug(`[WS] {${socketId}} connected`);
			const con = new Connection(socketId, client);
			connections.set(con.id, con);
			onConnect?.(con, methods);
		},
		onError(socketId, err) {
			log.debug(`[WS] {${socketId}} errored. ${err && err.message}`);
			const con = connections.get(socketId);
			onError && onError(err, con || socketId);
		},
		onMessage(socketId, data) {
			log.debug(`[WS] {${socketId}} says: ${data}`);
			if (onMessage) {
				const con = connections.get(socketId);
				con && onMessage(data, con, methods);
			}
		}
	});
};
