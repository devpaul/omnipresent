import { create, tsx } from '@dojo/framework/core/vdom';
import TextInput from '@dojo/widgets/text-input';

import { store } from '../../middleware/store';
import { authenticateProcess, setSecretProcess } from '../../processes/authenticate.process';
import Control from '../control/Control';

export interface AuthenticationProperties {
}

const factory = create({ store }).properties<AuthenticationProperties>();

export default factory(function Authentication({ middleware: { store: { get, path, executor } } }){
	const setSecret = executor(setSecretProcess);
	const authenticate = executor(authenticateProcess);
	const secret = get(path('auth', 'secret'));

	return (<div>
		<TextInput value={secret} onChange={(value) => { setSecret({ secret: String(value) }) }} placeholder="Secret" type="password" />
		<Control title="Authenticate" show={true} onClick={() => { authenticate({}) }} />
	</div>);
});
