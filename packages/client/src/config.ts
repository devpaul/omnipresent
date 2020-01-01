import globalObject from '@dojo/framework/shim/global';

export function getWebSocketServer() {
	const url = new URL(globalObject.location);
	return `ws://${url.host}`;
}
