import { Service } from "webserv";
import { realtimeUpgrade, Connection, ConnectionMethods } from "./realtime.upgrade";

export interface CommandServiceProperties {
	commands: Command[];
	defaultHandler?: CommandMiddleware;
}

export type CommandMiddleware = (data: Message, con: Connection, methods: ConnectionMethods) => void;

export interface Command {
	action: string;
	handler: CommandMiddleware;
}

export interface Message {
	action: string;
	[ key: string ]: any;
}

function isMessage(value: any): value is Message {
	return value && typeof value === 'object' && value.action;
}

export function commandService({ commands, defaultHandler }: CommandServiceProperties): Service {
	const commandMap = new Map<string, CommandMiddleware>(commands.map(command => ([command.action, command.handler])));

	const upgrade = realtimeUpgrade({
		onMessage(data, con, methods) {
			if (isMessage(data)) {
				const handler = commandMap.get(data.action) || defaultHandler;
				if (handler) {
					handler(data, con, methods);
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
