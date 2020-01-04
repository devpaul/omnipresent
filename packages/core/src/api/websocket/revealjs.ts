import { send, Message, MessageHandler, addMessageHandler } from "../../websocket/connection";

export interface NextSlideMessage extends Message {
	action: 'nextSlide';
}

export interface SlideChangedMessage extends Message {
	action: 'slideChanged';
	slide: number;
}

export interface PreviousSlideMessage extends Message {
	action: 'previousSlide';
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
export function previousSlide() {
	send({
		action: 'previousSlide'
	});
}

/**
 * Handle a request to decrement the slide
 */
export function handlePreviousSlide(handler: MessageHandler<PreviousSlideMessage>) {
	addMessageHandler('previousSlide', handler);
}

/**
 * Inform listeners that a new slide is showing
 */
export function slideChanged(slide: number) {
	send({
		action: 'slideChanged',
		slide
	});
}

/**
 * Handle the update of a slide
 */
export function handleSlideChanged(handler: MessageHandler<SlideChangedMessage>) {
	addMessageHandler('slideChanged', handler);
}
