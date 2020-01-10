import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { uploadSlide } from 'present-core/api/upload';
import { nextSlide, previousSlide } from 'present-core/api/websocket/revealjs';
import { getScreenshot } from 'present-core/webrtc/screen';

import { DECKNAME } from '../config';
import { SlideIndex, State } from '../interfaces';

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

const setSyncToSlidesCommand = commandFactory(({ path, payload: { value }}) => {
	return [
		replace(path('options', 'syncToSlides'), value)
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

export const nextSlideProcess = createProcess('next-slide', [ nextSlideCommand ]);
export const previousSlideProcess = createProcess('previous-slide', [ previousSlideCommand ]);
export const setCaptureSlidesProcess = createProcess('set-capture', [ setCaptureSlidesCommand ]);
export const setSyncToSlidesProcess = createProcess('set-capture', [ setSyncToSlidesCommand ]);
export const slideChangedProcess = createProcess('slide-changed', [ slideChangedCommand ]);
export const captureSlideProcess = createProcess('capture-slide', [ captureSlideCommand ]);