import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import Menu, { MenuProperties } from './Menu';
import { connectProcess, disconnectProcess, nextSlideProcess, previousSlideProcess } from '../../processes/realtime.process';

const factory = create({ store });

export default factory(function MenuProvider({ middleware: { store: { get, path, executor } }}){
	const props: MenuProperties = {
		isConnected: get(path('isConnected')),
		isSharing: get(path('isSharing')),
		onConnect: () => { executor(connectProcess)({}) },
		onDisconnect: () => { executor(disconnectProcess)({}) },
		onNextSlide: () => { executor(nextSlideProcess)({}) },
		onPreviousSlide: () => { executor(previousSlideProcess)({}) }
	};

	return (
		<Menu {... props} />
	);
});
