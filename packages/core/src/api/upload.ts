import { dataUrlToBlob } from "src/webrtc/screen";

export type ImageType = 'png' | 'jpg';

export interface ImageMetadata {
	name: string;
	type: ImageType;
}

export interface DeckMetadata {
	deck: string;
	slide: number;
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

	return fetch('/upload/', {
		method: 'POST',
		body: fd
	});
}

/**
 * Upload an image for a slide deck to the server
 */
export async function uploadDeckImage(file: Blob | string, { deck, slide, type }: DeckMetadata) {
	const imageBlob = typeof file === 'string' ? await dataUrlToBlob(file) : file;
	var fd = new FormData();
	const filename = `${deck}-${slide}.${type}`;
	fd.append('upl', imageBlob, filename);

	return fetch('/upload/', {
		method: 'POST',
		body: fd
	});
}
