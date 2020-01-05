import { createRequest, Action, createHandler } from "./api";

export interface ShowImagePayload {
	src: string;
}

export interface ShowSlidePayload {
	deck: string;
	slide: { h: number; v: number; };
	src: string;
}

export interface PointerPayload {
	position: { x: number, y: number }
}

const showImage = createRequest<ShowImagePayload>(Action.ShowImage);
const handleShowImage = createHandler<ShowImagePayload>(Action.ShowImage)

const showLaser = createRequest<PointerPayload>(Action.ShowLaser);
const handleShowLaser = createHandler<PointerPayload>(Action.ShowLaser);

const hideLaser = createRequest(Action.HideLaser);
const handleHideLaser = createRequest(Action.HideLaser);
