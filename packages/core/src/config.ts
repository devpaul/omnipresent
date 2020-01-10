export const defaultTimeout = 1000;

export function getWebSocketServer() {
	const location: Location = (window as any).location;
	const protocol = location.protocol === 'http:' ? 'ws:' : 'wss:';
	return `${protocol}//${location.host}`;
}
