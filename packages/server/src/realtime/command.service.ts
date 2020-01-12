import { Service } from "webserv";
import { realtimeUpgrade, Connection, ConnectionMethods, RealtimeUpgradeProperties } from "./realtime.upgrade";

export interface CommandServiceProperties extends Omit<RealtimeUpgradeProperties, 'onMessage'> {
	commands: Command[];
	defaultHandler?: CommandMiddleware;
}

export type CommandMiddleware<T extends Message = Message> = (data: T, con: Connection, methods: ConnectionMethods) => void | Promise<void>;

export interface Command {
	action: string;
	handler: CommandMiddleware<any>;
}

export interface Message {
	action: string;
	[ key: string ]: any;
}

interface ErrorPayload {
	message: string;
}

function isMessage(value: any): value is Message {
	return value && typeof value === 'object' && typeof value.action === 'string';
}

export function announce<T extends object>(connections: Iterable<Connection>, message: Message & T) {
	for (let con of connections) {
		sendResponse<T>(con, message);
	}
}

export function sendError<T extends ErrorPayload>(con: Connection, message: Message & T) {
	con.client.send(JSON.stringify({
		...message,
		action: `${message.action}-error`
	}));
}

export function sendResponse<T extends object>(con: Connection, message: Message & T) {
	con.client.send(JSON.stringify(message));
}

export function commandService({ commands, defaultHandler, ... rest }: CommandServiceProperties): Service {
	const commandMap = new Map<string, CommandMiddleware>(commands.map(command => ([command.action, command.handler])));

	const upgrade = realtimeUpgrade({
		onMessage(data, con, methods) {
			const message = typeof data === 'string' ? JSON.parse(data) : data;
			if (isMessage(message)) {
				const handler = commandMap.get(message.action) || defaultHandler;
				if (handler) {
					handler(message, con, methods);
				}
			}
		},
		... rest
	});

	return {
		upgrade: {
			upgrade
		}
	};
}
