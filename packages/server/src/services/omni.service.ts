import { commandService, CommandMiddleware, Message } from "../realtime/command.service";
import { SECRET } from "../config";
import { Connection, ConnectionMethods } from "../realtime/realtime.upgrade";
import { log } from "webserv/src/core/log";

export const enum Action {
	Authenticate = 'authenticate',
	GetStatus = 'getStatus',
	RoleConnected = 'roleConnected',
	RoleLeft = 'roleLeft',
}

export const enum Response {
	Authenticated = 'authenticated',
	Status = 'status'
}

export interface StatusPayload {
	roles: string[];
	connectionCount: number;
}

interface ErrorPayload {
	message: string;
}

function announce<T extends object>(connections: Iterable<Connection>, message: Message & T) {
	for (let con of connections) {
		sendResponse<T>(con, message);
	}
}

function sendError<T extends ErrorPayload>(con: Connection, message: Message & T) {
	con.client.send(JSON.stringify({
		...message,
		action: `${message.action}-error`
	}));
}

function sendResponse<T extends object>(con: Connection, message: Message & T) {
	con.client.send(JSON.stringify(message));
}

const defaultHandler: CommandMiddleware = (data, con, { getAll }) => {
	const message = JSON.stringify(data);
	for (let connection of getAll()) {
		if (con.id !== connection.id) {
			connection.client.send(message);
		}
	}
}

interface AuthenticationMessage {
	action: Action.Authenticate,
	role: string;
	secret: string;
}

interface AuthenticatedUser {
	roles: Set<string>
}

const roleMap = new Map<string, Set<string>>();
const authenticated = new Map<string, AuthenticatedUser>();

function userLeft(id: string, {getAll}: ConnectionMethods) {
	const user = authenticated.get(id);
	authenticated.delete(id);

	if (user) {
		for (let role in user.roles) {
			roleMap.get(role)?.delete(id);
			if (!roleMap.get(role)?.size) {
				roleMap.delete(role);
				announce(getAll(), {
					action: Action.RoleLeft,
					role
				})
			}
		}
	}
}

const authenticateHandler: CommandMiddleware<AuthenticationMessage> = (message, con, { getAll }) => {
	if (message.secret === SECRET) {
		const { role } = message;
		const { id } = con;
		if (!roleMap.has(role)) {
			roleMap.set(role, new Set());
		}
		const users = roleMap.get(role);
		users?.add(id);

		const meta = authenticated.get(id) || { roles: new Set() };
		authenticated.set(id, meta);
		meta.roles.add(role);

		sendResponse(con, { action: Response.Authenticated, role });
		log.info(`[OMNI] Authenticated User "${con.id} as ${role}"`);
		announce(getAll(), { action: Action.RoleConnected, role });
	}
	else {
		sendError(con, { action: Action.Authenticate, message: 'bad secret' });
	}
};

const getStatusHandler: CommandMiddleware = (message, con, { getSize }) => {
	sendResponse<StatusPayload>(con, {
		action: Response.Status,
		roles: Array.from(roleMap.keys()),
		connectionCount: getSize()
	});
}

export const omni = commandService({
	commands: [
		{ action: Action.Authenticate, handler: authenticateHandler },
		{ action: Action.GetStatus, handler: getStatusHandler }
	],
	defaultHandler,
	onDisconnect(con, methods) {
		userLeft(con.id, methods);
	}
});
