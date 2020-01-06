import { create, tsx } from '@dojo/framework/core/vdom';

import { store } from '../../middleware/store';
import Authentication, { AuthenticationProperties } from './Authentication';

const factory = create({ store });

export default factory(function MenuProvider({ middleware: { store: { get, path, executor } }}){
	const props: AuthenticationProperties = {
		secret: get(path('auth', 'secret')) || ''
	};

	return (
		<Authentication {... props} />
	);
});
