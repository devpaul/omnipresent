import { commandService, CommandMiddleware } from "../realtime/command.service";

const defaultHandler: CommandMiddleware = (data, con, { getAll }) => {
	const message = JSON.stringify(data);
	for (let connection of getAll()) {
		if (con.id !== connection.id) {
			connection.client.send(message);
		}
	}
}

export const omni = commandService({
	commands: [],
	defaultHandler
});
