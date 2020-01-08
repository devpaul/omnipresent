import Store from '@dojo/framework/stores/Store';
import { handleStatus } from 'present-core/api/websocket/info';
import { handleShowMedia } from 'present-core/api/websocket/screen';

import { State } from '../interfaces';
import { setSourceProcess } from '../process/screen.process';

let store: Store<State>

export function initialize(s: Store<State>) {
	store = s;

	handleShowMedia((media) => {
		setSourceProcess(store)(media);
	});

	handleStatus(({ screen }) => {
		setSourceProcess(store)(screen.media);
	});
}
