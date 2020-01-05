import { Action, createHandler, createRequest } from './api';

export interface SlideChangedPayload {
	h: number;
	v: number;
}

export const nextSlide = createRequest(Action.NextSlide);
export const handleNextSlide = createHandler(Action.NextSlide);

export const previousSlide = createRequest(Action.PreviousSlide);
export const handlePreviousSlide = createHandler(Action.PreviousSlide);

export const slideChanged = createRequest<SlideChangedPayload>(Action.SlideChanged);
export const handleSlideChanged = createHandler<SlideChangedPayload>(Action.SlideChanged);
