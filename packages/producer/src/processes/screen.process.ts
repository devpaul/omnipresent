import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { Screen, State } from '../interfaces';
import { SlideMedia, showMedia } from 'present-core/api/websocket/screen';

const commandFactory = createCommandFactory<State>();

const setScreenMediaCommand = commandFactory<Screen['media']>(({ path, payload }) => {
	return [
		replace(path('screen', 'media'), payload)
	];
});

const publishSlideToScreenCommand = commandFactory<SlideMedia>(({payload}) => {
	showMedia(payload);
});

export const setScreenMediaProcess = createProcess('set-screen-media', [setScreenMediaCommand]);
export const publishSlideToScreenProcess = createProcess('publish-slide-to-screen', [ publishSlideToScreenCommand ]);
