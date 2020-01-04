import { send, Message, MessageHandler, addMessageHandler } from "../../websocket/connection";

export interface NextSlideMessage extends Message {
	action: 'nextSlide';
}

/**
 * Increment the slide to the next slide
 */
export function nextSlide() {
	send({
		action: 'nextSlide'
	});
}

export function handleNextSlide(handler: MessageHandler<NextSlideMessage>) {
	addMessageHandler('nextSlide', handler);
}

/**
 * Decrement the slide to the previous slide
 */
export function previousSlide(socket: WebSocket) {
	// TODO implement
}

/**
 * Handle a request to decrement the slide
 */
export function handlePreviousSlide(socket: WebSocket) {
	// TODO implement
}

/**
 * Inform listeners that a new slide is showing
 */
export function slideShowing(socket: WebSocket) {
	// TODO implement
}

/**
 * Handle the update of a slide
 */
export function handleSlideShowing(socket: WebSocket) {
	// TODO implement
}
