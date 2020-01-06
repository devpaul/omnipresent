import { createCommandFactory, createProcess } from "@dojo/framework/stores/process";
import { State } from '../interfaces';
import { replace } from '@dojo/framework/stores/state/operations';

const commandFactory = createCommandFactory<State>();

const setSecretCommand = commandFactory(({ path, payload: { secret }}) => {
	return [
		replace(path('auth', 'secret'), secret)
	];
});

const saveSecretCommand = commandFactory(({ get, path }) => {
	const secret = get(path('auth', 'secret'));

	if (secret) {
		localStorage.setItem('secret', secret);
	}
	else {
		localStorage.removeItem('secret');
	}
});

const loadSecretCommand = commandFactory(({ path }) => {
	const secret = localStorage.getItem('secret');

	if (secret) {
		return [
			replace(path('auth', 'secret'), secret)
		];
	}
})

export const loadSecretProcess = createProcess('load-secret', [ loadSecretCommand ])
export const saveSecretProcess = createProcess('save-secret', [ saveSecretCommand ]);
export const setSecretProcess = createProcess('set-secret', [ setSecretCommand ]);
