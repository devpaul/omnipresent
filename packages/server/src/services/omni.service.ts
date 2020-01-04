import { commandService, CommandMiddleware, Message } from "../realtime/command.service";
import { SECRET } from "../config";
import { Connection } from "../realtime/realtime.upgrade";
import { log } from "webserv/src/core/log";

export const enum Action {
	Authenticate = 'authenticate',
	Authenticated = 'authenticated'
}

interface ErrorMessage extends Message {
	message: string;
}

function sendError<T extends ErrorMessage>(con: Connection, message: T) {
	con.client.send(JSON.stringify({
		...message,
		action: `${message.action}-error`
	}));
}

function sendResponse<T extends Message>(con: Connection, message: T) {
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

const roleMap = new Map<string, Set<string>>();

const authenticateHandler: CommandMiddleware<AuthenticationMessage> = (message, con) => {
	if (message.secret === SECRET) {
		const { role } = message;
		if (!roleMap.has(role)) {
			roleMap.set(role, new Set());
		}

		const users = roleMap.get(role);
		users?.add(con.id);
		sendResponse(con, { action: Action.Authenticated, role });
		log.info(`[OMNI] Authenticated User "${con.id}"`);
	}
	else {
		sendError(con, { action: Action.Authenticate, message: 'bad secret' });
	}
};

export const omni = commandService({
	commands: [
		{ action: 'authenticate', handler: authenticateHandler }
	],
	defaultHandler
});
