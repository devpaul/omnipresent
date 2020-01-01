import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { replace } from '@dojo/framework/stores/state/operations';

const commandFactory = createCommandFactory<State>();

const getPresentationCommand = commandFactory(async ({ path }) => {
	const result = await fetch('/presentation');
	const presentation = await result.json();

	return [
		replace(path('presentation'), presentation)
	];
});

export const getPresentation = createProcess('get-presentation', [ getPresentationCommand ]);
