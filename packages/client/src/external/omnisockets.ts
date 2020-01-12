import Store from '@dojo/framework/stores/Store';
import { handleStatus } from 'present-core/api/websocket/info';
import { handleShowMedia } from 'present-core/api/websocket/screen';
import { handlePose } from 'present-core/api/websocket/presenter';

import { State } from '../interfaces';
import { setSourceProcess } from '../processes/screen.process';
import { handleAuthenticateError, handleAuthenticated, handleNotAuthenticated } from 'present-core/api/websocket/authenticate';
import { setUnauthenticatedProcess, setAuthenticatedProcess } from '../processes/authenticate.process';
import { snackbar } from './aframe/snackbar';
import { changePose } from './aframe/pose';

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

	handlePose((pose) => {
		changePose(pose);
	});
}
