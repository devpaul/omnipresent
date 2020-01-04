import { Message, send, MessageHandler, addMessageHandler } from "../../websocket/connection";
import { createRequest, Action, createHandler, Response } from "./api";

export interface StatusPayload {
	connectedRoles: string[];
	connectionCount: number;
}

export const getStatus = createRequest(Action.GetStatus);
export const handleStatus = createHandler(Response.Status);
