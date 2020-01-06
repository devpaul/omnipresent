import { create, tsx } from '@dojo/framework/core/vdom';

import { store } from '../../middleware/store';
import Authentication, { AuthenticationProperties } from './Authentication';
import { setSecretProcess, authenticateProcess } from '../../processes/authenticate.process';

const factory = create({ store });

export default factory(function MenuProvider({ middleware: { store: { get, path, executor } }}){
	const setSecret = executor(setSecretProcess);
	const authenticate = executor(authenticateProcess);
	const props: AuthenticationProperties = {
		secret: get(path('auth', 'secret')) || '',
		onChange: secret => setSecret({ secret }),
		onSubmit: secret => authenticate({ secret })
	};

	return (
		<Authentication {... props} />
	);
});
