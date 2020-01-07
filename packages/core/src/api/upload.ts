import { dataUrlToBlob } from "../webrtc/screen";

export type ImageType = 'png' | 'jpg';

export interface ImageMetadata {
	name: string;
	type: ImageType;
}

export interface DeckMetadata {
	deck: string;
	indexh: number;
	indexv: number;
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
export async function uploadSlide(file: Blob | string, { deck, indexh, indexv, type}: DeckMetadata) {
	const imageBlob = typeof file === 'string' ? await dataUrlToBlob(file) : file;
	var fd = new FormData();
	const filename = getSlideName(deck, indexh, indexv, type);
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

export function getSlideName(deck: string, h: number, v: number, type: string = 'png') {
	return `${deck}-${h}-${v}.${type}`;
}
