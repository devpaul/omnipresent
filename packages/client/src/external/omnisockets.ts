import Store from '@dojo/framework/stores/Store';
import { handleStatus } from 'present-core/api/websocket/info';
import { handleShowMedia } from 'present-core/api/websocket/screen';

import { State } from '../interfaces';
import { setSourceProcess } from '../process/screen.process';
import { handleAuthenticateError, handleAuthenticated, handleNotAuthenticated } from 'present-core/api/websocket/authenticate';
import { setUnauthenticatedProcess, setAuthenticatedProcess } from '../process/authenticate.process';
import { snackbar } from './aframe';

let store: Store<State>

export function initialize(s: Store<State>) {
	store = s;

	handleShowMedia((media) => {
		setSourceProcess(store)(media);
	});

	handleStatus(({ screen }) => {
		setSourceProcess(store)(screen.media);
	});

	handleAuthenticateError(() => {
		setUnauthenticatedProcess(store)({});
	});

	handleAuthenticated(() => {
		setAuthenticatedProcess(store)({});
		snackbar('Authenticated!');
	});

	handleNotAuthenticated(() => {
		setUnauthenticatedProcess(store)({});
		snackbar('Not Authenticated');
	});
}
