import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import Status from './Status';

const factory = create({ store });

export default factory(function StatusProvider({ middleware: { store }}){
	const { get, path } = store;
	const props = {
		isConnected: get(path('isConnected')),
		isSharing: get(path('isSharing')),
		currentSlide: get(path('slide')),
		...get(path('stats'))
	};

	return (
		<Status {... props} />
	);
});
