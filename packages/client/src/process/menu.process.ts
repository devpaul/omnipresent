import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { replace } from '@dojo/framework/stores/state/operations';

const commandFactory = createCommandFactory<State>();

const closeMenuCommand = commandFactory(({ get, path }) => {
	return [
		replace(path('openMenu'), false)
	]
});

const openMenuCommand = commandFactory(({ get, path }) => {
	return [
		replace(path('openMenu'), true)
	]
});

export const closeMenuProcess = createProcess('close-menu', [ closeMenuCommand ]);
export const openMenuProcess = createProcess('close-menu', [ openMenuCommand ]);
