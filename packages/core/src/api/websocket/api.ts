import { Message, send, MessageHandler, addMessageHandler } from "../../websocket/connection";

export const enum Action {
	Authenticate = 'authenticate',
	GetScreen = 'getScreen',
	GetStatus = 'getStatus',
	HideLaser = 'hideLaser',
	NextSlide = 'nextSlide',
	PreviousSlide = 'previousSlide',
	RoleConnected = 'roleConnected',
	RoleLeft = 'roleLeft',
	ShowLaser = 'showLaser',
	ShowMedia = 'showMedia',
	SlideChanged = 'slideChanged'
}

export const enum Response {
	Authenticated = 'authenticated',
	NotAuthenticated = 'notAuthenticated',
	Screen = 'screen',
	Status = 'status'
}

export interface ErrorPayload {
	message: string;
}

/**
 * Creates a request for another system to handle
 */
export function createRequest<PAYLOAD extends object = {}>(action: Action, partial?: object) {
	return (payload: PAYLOAD) => {
		send({
			... payload,
			... partial,
			action
		});
	};
}

/**
 * Creates a function for assigning a handler to a WebSocket response
 */
export function createHandler<PAYLOAD extends object = {}>(action: Action | Response) {
	return (handler: MessageHandler<Message & PAYLOAD>) => {
		addMessageHandler(action, handler);
	}
}

/**
 * Creates a function for assigning a handler to an error related to an action
 */
export function createErrorHandler<PAYLOAD extends ErrorPayload>(action: Action) {
	return (handler: MessageHandler<Message & PAYLOAD>) => {
		addMessageHandler(`${action}-error`, handler);
	}
}
