import { dataUrlToBlob } from "../webrtc/screen";
import { SlideIndex } from "./websocket/revealjs";

export type ImageType = 'png' | 'jpg';

export interface ImageMetadata {
	name: string;
	type: ImageType;
}

export interface DeckMetadata {
	deck: string;
	slide: SlideIndex;
	type: ImageType;
}

/**
 * Upload an image to the server
 */
export async function uploadImage(file: Blob | string, { name, type }: ImageMetadata) {
	const imageBlob = typeof file === 'string' ? await dataUrlToBlob(file) : file;
	var fd = new FormData();
	const filename = `${name}.${type}`;
	fd.append('upl', imageBlob, filename);
	const result = await fetch('/upload/', {
		method: 'POST',
		body: fd
	});
	return {
		result,
		filename
	};
}

/**
 * Upload an image for a slide deck to the server
 */
export async function uploadSlide(file: Blob | string, { deck, slide, type}: DeckMetadata) {
	const imageBlob = typeof file === 'string' ? await dataUrlToBlob(file) : file;
	var fd = new FormData();
	const filename = getSlideName(slide, deck, type);
	fd.append('upl', imageBlob, filename);
	const result = await fetch('/upload/', {
		method: 'POST',
		body: fd
	});
	return {
		filename,
		result
	};
}

export function getSlideName(slide: SlideIndex, deck: string, type: string) {
	if (slide.f != null && slide.f >= 0) {
		return `${deck}-${slide.h}-${slide.v}-${slide.f}.${type}`;
	}
	return `${deck}-${slide.h}-${slide.v}.${type}`;
}
