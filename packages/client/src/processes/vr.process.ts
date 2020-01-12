import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';

import { State } from '../interfaces';

const commandFactory = createCommandFactory<State>();

const setEnterVrCommand = commandFactory(({ path }) => {
	return [
		replace(path('isInVr'), true)
	];
});

const setExitVrCommand = commandFactory(({ path }) => {
	return [
		replace(path('isInVr'), false)
	];
});

const setPresentingCommand = commandFactory(({ path, payload: { value } }) => {
	return [
		replace(path('isPresenter'), value)
	];
});

export const enterVrProcess = createProcess('enter-vr', [ setEnterVrCommand ]);
export const exitVrProcess = createProcess('exit-vr', [ setExitVrCommand ]);
export const startPresentingProcess = createProcess('start-presenting', [ setPresentingCommand ]);
