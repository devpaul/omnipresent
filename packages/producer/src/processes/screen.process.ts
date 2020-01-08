import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { Screen, State } from '../interfaces';
import { SlideMedia, showMedia } from 'present-core/api/websocket/screen';
import { DECKNAME, IMAGETYPE, getSlideUrl } from '../config';

const commandFactory = createCommandFactory<State>();

const setScreenMediaCommand = commandFactory<Screen['media']>(({ path, payload }) => {
	return [
		replace(path('screen', 'media'), payload)
	];
});

const publishSlideToScreenCommand = commandFactory<SlideMedia>(({payload}) => {
	showMedia(payload);
});

const publishCurrentSlideToScreenCommand = commandFactory(({ get, path }) => {
	const slide = get(path('slide'));

	showMedia({
		type: 'slide',
		deck: DECKNAME,
		slide,
		src: getSlideUrl(DECKNAME, slide.h, slide.v, IMAGETYPE)
	})
})

export const setScreenMediaProcess = createProcess('set-screen-media', [setScreenMediaCommand]);
export const publishSlideToScreenProcess = createProcess('publish-slide-to-screen', [ publishSlideToScreenCommand ]);
export const publishCurrentSlideToScreenProcess = createProcess('publish-current-slide-to-screen', [publishCurrentSlideToScreenCommand]);
