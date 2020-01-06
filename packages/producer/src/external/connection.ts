import { State } from '../interfaces';
import Store from '@dojo/framework/stores/Store';
import { setDisconnectedProcess } from '../processes/connection.process';

let connection: WebSocket | undefined;
let store: Store<State>;

export function initializeConnection(s: Store<State>) {
	store = s;
}

export function setConnection(con: WebSocket) {
	if (connection) {
		connection.close();
	}
	connection = con;
	con.addEventListener('close', () => {
		setDisconnectedProcess(store)({ con });
		connection = undefined;
	});
}
