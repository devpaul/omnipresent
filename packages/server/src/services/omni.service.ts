import { commandService, CommandMiddleware, Message } from "../realtime/command.service";
import { SECRET } from "../config";
import { Connection, ConnectionMethods } from "../realtime/realtime.upgrade";
import { log } from "webserv/src/core/log";
import { listRoles, userLeft, addAuthenticated, isAuthenticated } from "./omni.state";

export const enum Action {
	Authenticate = 'authenticate',
	GetStatus = 'getStatus',
	HideLaser = 'hideLaser',
	NextSlide = 'nextSlide',
	PreviousSlide = 'previousSlide',
	RoleConnected = 'roleConnected',
	RoleLeft = 'roleLeft',
	ShowImage = 'showImage',
	ShowLaser = 'showLaser',
	SlideChanged = 'slideChanged'
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

const echo: CommandMiddleware = (data, con, { getAll }) => {
	const message = JSON.stringify(data);
	for (let connection of getAll()) {
		if (con.id !== connection.id) {
			connection.client.send(message);
		}
	}
}

const authenticatedEcho: CommandMiddleware = (data, con, methods) => {
	if (isAuthenticated(con.id)) {
		echo(data, con, methods);
	}
	else {
		log.warn(`[OMNI] Unauthenticated user action "${data.action} by ${con.id}"`)
	}
}

interface AuthenticationMessage {
	action: Action.Authenticate,
	role: string;
	secret: string;
}

const authenticateHandler: CommandMiddleware<AuthenticationMessage> = (message, con, { getAll }) => {
	if (message.secret === SECRET) {
		const { role } = message;
		const { id } = con;
		addAuthenticated(id, role);

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
		roles: listRoles(),
		connectionCount: getSize()
	});
}

export const omni = commandService({
	commands: [
		{ action: Action.Authenticate, handler: authenticateHandler },
		{ action: Action.GetStatus, handler: getStatusHandler },
		{ action: Action.HideLaser, handler: authenticatedEcho },
		{ action: Action.NextSlide, handler: authenticatedEcho },
		{ action: Action.PreviousSlide, handler: authenticatedEcho },
		{ action: Action.ShowImage, handler: authenticatedEcho },
		{ action: Action.ShowLaser, handler: authenticatedEcho },
		{ action: Action.SlideChanged, handler: authenticatedEcho }
	],
	defaultHandler: echo,
	onDisconnect(con, {getAll}) {
		const result = userLeft(con.id);
		if (result.authenticated) {
			for (let role of result.removedRoles) {
				announce(getAll(), {
					action: Action.RoleLeft,
					role
				});
			}
		}

	}
});
