interface MediaDevices {
	getDisplayMedia: (constraints: MediaStreamConstraints) => Promise<MediaStream>
}
