import Store from '@dojo/framework/stores/Store';
import { connect } from 'present-core/websocket/connection';

import { State } from '../interfaces';

let store: Store<State>;
let connection: WebSocket | undefined;

export function initialize(s: Store<State>) {
	store = s;
}

export async function createConnection(onClose: (store: Store<State>) => void) {
	disconnect();
	connection = await connect();
	connection.addEventListener('close', () => { onClose(store) });
	return connection;
}

export function disconnect() {
	if (!connection) {
		return;
	}

	connection.close();
	connection = undefined;
}
