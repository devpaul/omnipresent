import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import Status, { StatusProperties } from './Status';

const factory = create({ store });

export default factory(function StatusProvider({ middleware: { store }}){
	const { get, path } = store;
	const props: StatusProperties = {
		isConnected: get(path('isConnected')),
		isSharing: get(path('isSharing')),
		isAuthenticated: get(path('auth', 'isAuthenticated')),
		currentSlide: get(path('slide', 'h')),
		...get(path('stats'))
	};

	return (
		<Status {... props} />
	);
});
