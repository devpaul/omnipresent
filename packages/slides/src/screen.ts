let media: Promise<MediaStream> | undefined;

export function getScreenMedia() {
	if (media) {
		return media;
	}
	media = navigator.mediaDevices.getDisplayMedia({
		video: true
	});
	return media;
}

export async function getScreenshot() {
	const canvas = document.createElement('canvas');
	const video = document.createElement('video');
	const screen = await getScreenMedia();

	video.srcObject = screen;
	video.muted = true;
	await video.play();

	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	const context = canvas.getContext('2d');
	context?.drawImage(video, 0, 0, canvas.width, canvas.height);

	return canvas.toDataURL('image/png');
}

export async function dataUrlToBlob(dataUrl:string) {
	const request = await fetch(dataUrl);
	return request.blob();
}

export function isConnected() {
	return Boolean(media);
}
