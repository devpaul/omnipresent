export function getScreenMedia() {
	return navigator.mediaDevices.getDisplayMedia({
		video: true
	});
}

export function castMedia(media: MediaStream, videoEl: HTMLVideoElement) {
	videoEl.autoplay = true;
	videoEl.srcObject = media;
	videoEl.onloadedmetadata = () => {
		videoEl.play()
	}
}
