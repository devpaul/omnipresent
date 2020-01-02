export function getWebSocketServer() {
	const url = new URL((window as any)?.location);
	return `ws://${url.host}`;
}
