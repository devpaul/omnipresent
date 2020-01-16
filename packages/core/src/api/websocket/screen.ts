import { createRequest, Action, createHandler, Response } from "./api";
import { SlideIndex } from "./revealjs";

export interface PointerPayload {
	position: { x: number, y: number }
}

export interface ScreenPayload {
	media: Media;
}

export interface SlideMedia {
	type: 'slide';
	deck: string;
	slide: SlideIndex;
	src: string;
}

export interface ImageMedia {
	type: 'image';
	src: string;
}

export interface VideoMedia {
	type: 'video',
	src: string;
}

export type Media = SlideMedia | ImageMedia | VideoMedia;

export const getScreen = createRequest(Action.GetScreen);
export const handleScreen = createHandler<ScreenPayload>(Response.Screen);

export const showMedia = createRequest<Media>(Action.ShowMedia);
export const handleShowMedia = createHandler<Media>(Action.ShowMedia);

export const showLaser = createRequest<PointerPayload>(Action.ShowLaser);
export const handleShowLaser = createHandler<PointerPayload>(Action.ShowLaser);

export const hideLaser = createRequest(Action.HideLaser);
export const handleHideLaser = createRequest(Action.HideLaser);
