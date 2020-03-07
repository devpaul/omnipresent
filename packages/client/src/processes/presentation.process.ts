import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import {State} from '../interfaces';

const commandFactory = createCommandFactory<State>();

/**
 * @returns a list of recorded and live shows that may be viewed
 */
const getPresentationListCommand = commandFactory(({ path }) => {
	return [
		replace(path('data', 'presentations'), { data: [], length: 0 })
	];
});

export const getPresentationList = createProcess('get-recordings', [ getPresentationListCommand ]);
