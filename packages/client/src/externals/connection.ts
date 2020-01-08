import { State } from '../interfaces';
import Store from '@dojo/framework/stores/Store';
import { connect } from 'present-core/websocket/connection';
import { isDisconnectedProcess, isConnectedProcess } from '../process/connection.process';

let store: Store<State>;
let connection: WebSocket | undefined;

export function initialize(s: Store<State>) {
	store = s;
}

export async function getConnection() {
	disconnect();

	connection = await connect();
	connection.addEventListener('close', () => {
		isDisconnectedProcess(store)({});
	});
	await isConnectedProcess(store)({});
}

export function disconnect() {
	if (!connection) {
		return;
	}

	connection.close();
	connection = undefined;
}
