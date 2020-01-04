import { Service } from "webserv";
import { realtimeUpgrade, Connection, ConnectionMethods } from "./realtime.upgrade";

export interface CommandServiceProperties {
	commands: Command[];
	defaultHandler?: CommandMiddleware;
}

export type CommandMiddleware<T extends Message = Message> = (data: T, con: Connection, methods: ConnectionMethods) => void;

export interface Command {
	action: string;
	handler: CommandMiddleware<any>;
}

export interface Message {
	action: string;
	[ key: string ]: any;
}

function isMessage(value: any): value is Message {
	return value && typeof value === 'object' && typeof value.action === 'string';
}

export function commandService({ commands, defaultHandler }: CommandServiceProperties): Service {
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
		}
	});

	return {
		upgrade: {
			upgrade
		}
	};
}
