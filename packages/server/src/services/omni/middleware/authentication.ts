import { announce, CommandMiddleware, sendError, sendResponse } from '../../../realtime/command.service';
import { log } from 'webserv/src/core/log';

import { SECRET } from '../../../config';
import { Action, Response } from '../Actions';
import { addAuthenticated, isAuthenticated } from '../omni.state';

interface AuthenticationMessage {
	action: Action.Authenticate,
	role: string;
	secret: string;
}

export function authenticatedWrapper(middleware: CommandMiddleware): CommandMiddleware {
	return (data, con, methods) => {
		if (isAuthenticated(con.id)) {
			middleware(data, con, methods);
		}
		else {
			con.client.send(JSON.stringify({ action: Response.NotAuthenticated, data }));
			log.warn(`[OMNI] Unauthenticated user action "${data.action} by ${con.id}"`)
		}
	}
}

export const authenticateHandler: CommandMiddleware<AuthenticationMessage> = (message, con, { getAll }) => {
	const { role } = message;
	const { id } = con;
	if (message.secret === SECRET) {
		addAuthenticated(id, role);

		sendResponse(con, { action: Response.Authenticated, role });
		log.info(`[OMNI] Authenticated User "${id} as ${role}"`);
		announce(getAll(), { action: Action.RoleConnected, role });
	}
	else {
		log.warn(`[OMNI] Connection ${id} failed to authenticate as ${role}`);
		sendError(con, { action: Action.Authenticate, message: 'bad secret' });
	}
};
