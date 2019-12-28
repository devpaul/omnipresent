/**
 * Sets up a video element to automatically play a media stream
 * @param media a live media stream
 * @param videoEl The target video element
 */
export function castMedia(media: MediaStream, videoEl: HTMLVideoElement) {
	videoEl.autoplay = true;
	videoEl.srcObject = media;
	videoEl.onloadedmetadata = () => {
		videoEl.play()
	}
}

/**
 * Makes a request to screenshare
 */
export function getScreenMedia() {
	return navigator.mediaDevices.getDisplayMedia({
		video: true
	});
}
