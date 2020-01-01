import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { replace } from '@dojo/framework/stores/state/operations';
import globalObject from '@dojo/framework/shim/global';

const commandFactory = createCommandFactory<State>();

const closeMenuCommand = commandFactory(({ path }) => {
	return [
		replace(path('openMenu'), false)
	]
});

const openMenuCommand = commandFactory(({ path }) => {
	return [
		replace(path('openMenu'), true)
	]
});

const viewSlidesCommand = commandFactory(() => {
	globalObject.location = '/slides/';
})

export const closeMenuProcess = createProcess('close-menu', [ closeMenuCommand ]);
export const openMenuProcess = createProcess('close-menu', [ openMenuCommand ]);
export const viewSlidesProcess = createProcess('view-slides', [ viewSlidesCommand ]);
