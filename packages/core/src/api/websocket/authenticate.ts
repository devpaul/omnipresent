import { Message, send, MessageHandler, addMessageHandler } from "../../websocket/connection";
import { createRequest, Action, createHandler, Response, createErrorHandler } from "./api";

export interface AuthenticatePayload {
	role: string;
	secret: string;
}

export const authenticate = createRequest<AuthenticatePayload>(Action.Authenticate);
export const handleAuthenticateError = createErrorHandler(Action.Authenticate);
export const handleAuthenticated = createHandler(Response.Authenticated);
export const handleNotAuthenticated = createHandler(Response.NotAuthenticated);
