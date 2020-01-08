import { CommandMiddleware, sendResponse } from "../../../realtime/command.service";
import { listRoles } from "../omni.state";
import { Response, Action } from '../Actions';
import { getResponse } from "./cacheResponse";

export interface StatusPayload {
	roles: string[];
	connectionCount: number;
}

export const getStatus: CommandMiddleware = (message, con, { getSize }) => {
	const status = {
		action: Response.Status,
		roles: listRoles(),
		connectionCount: getSize(),
		screen: {
			media: getResponse(Action.ShowMedia)
		},
		slide: getResponse(Action.SlideChanged)
	};
	sendResponse<StatusPayload>(con, status);
}
