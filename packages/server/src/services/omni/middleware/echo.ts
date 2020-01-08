import { CommandMiddleware } from "../../../realtime/command.service";

export const echo: CommandMiddleware = (data, con, { getAll }) => {
	const message = JSON.stringify(data);
	for (let connection of getAll()) {
		if (con.id !== connection.id) {
			connection.client.send(message);
		}
	}
}

export const echoAll: CommandMiddleware = (data, _con, { getAll }) => {
	const message = JSON.stringify(data);
	for (let connection of getAll()) {
		connection.client.send(message);
	}
}
