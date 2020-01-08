import { Message, CommandMiddleware } from '../../../realtime/command.service';

export const responseCache = new Map<string, Message>();

export function cacheResponse(middleware: CommandMiddleware): CommandMiddleware {
	return (data, con, methods) => {
		responseCache.set(data.action, data);
		middleware(data, con, methods);
	}
}

export function getResponse(action: string) {
	const data = responseCache.get(action);

	if (typeof data === 'object') {
		const { action, ... rest } = data;
		return rest;
	}
}
