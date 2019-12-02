import check from "src/compatability";

export function getScreenMedia() {
	return navigator.mediaDevices.getDisplayMedia({
		video: true
	});
}

export function castMedia(media: MediaStream, node: Node = document.body) {
	const doc = node.ownerDocument || document;
	const video: HTMLVideoElement = doc.createElement('video') as any;
	video.autoplay = true;
	video.srcObject = media;
	for (let element of Array.from(document.querySelectorAll('video'))) {
		element.parentNode!.removeChild(element);
	}
	node.appendChild(video);
}
