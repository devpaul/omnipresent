import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { uploadSlide } from 'present-core/api/upload';
import { nextSlide, previousSlide } from 'present-core/api/websocket/revealjs';
import { showMedia } from 'present-core/api/websocket/screen';
import { getScreenshot } from 'present-core/webrtc/screen';

import { SlideIndex, State } from '../interfaces';
import { DECKNAME, getSlideUrl } from '../config';

const commandFactory = createCommandFactory<State>();

const nextSlideCommand = commandFactory(() => {
	nextSlide({});
});

const previousSlideCommand = commandFactory(() => {
	previousSlide({});
});

const slideChangedCommand = commandFactory<SlideIndex>(({ get, path, payload }) => {
	return [
		replace(path('slide'), payload)
	];
});

const setCaptureSlidesCommand = commandFactory(({ path, payload: { value } }) => {
	return [
		replace(path('options', 'captureSlides'), value)
	];
});

const captureSlideCommand = commandFactory(async ({ get, path }) => {
	const slide = get(path('slide'));
	const isSharing = get(path('isSharing'));

	if (!slide) {
		throw new Error('No slide information');
	}
	if (!isSharing) {
		throw new Error ('Not Sharing');
	}

	const dataUrl = await getScreenshot();
	await uploadSlide(dataUrl, {
		deck: DECKNAME,
		indexh: slide.h,
		indexv: slide.v,
		type: 'png'
	});
});

const displaySlideCommand = commandFactory(({ payload: {deck, h, v, type }}) => {
	showMedia({
		type: 'slide',
		deck,
		slide: { h, v },
		src: getSlideUrl(deck, h, v, type)
	});
});

export const nextSlideProcess = createProcess('next-slide', [ nextSlideCommand ]);
export const previousSlideProcess = createProcess('previous-slide', [ previousSlideCommand ]);
export const setCaptureSlidesProcess = createProcess('set-capture', [ setCaptureSlidesCommand ]);
export const slideChangedProcess = createProcess('slide-changed', [ slideChangedCommand ]);
export const captureSlideProcess = createProcess('capture-slide', [ captureSlideCommand ]);
export const displaySlideProcess = createProcess('display-slide', [ displaySlideCommand ]);
