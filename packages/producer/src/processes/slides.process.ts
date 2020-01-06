import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { nextSlide, previousSlide } from 'present-core/api/websocket/revealjs';

import { State } from '../interfaces';

const commandFactory = createCommandFactory<State>();

const nextSlideCommand = commandFactory(() => {
	nextSlide({});
});

const previousSlideCommand = commandFactory(() => {
	previousSlide({});
});

export const nextSlideProcess = createProcess('next-slide', [ nextSlideCommand ]);
export const previousSlideProcess = createProcess('previous-slide', [ previousSlideCommand ]);
