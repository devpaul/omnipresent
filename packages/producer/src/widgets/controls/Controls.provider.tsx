import { create, tsx } from '@dojo/framework/core/vdom';

import { store } from '../../middleware/store';
import { connectProcess, disconnectProcess } from '../../processes/connection.process';
import { nextSlideProcess, previousSlideProcess } from '../../processes/slides.process';
import { shareScreenProcess, stopSharingScreenProcess } from '../../processes/webrtc.process';
import Controls, { ControlsProperties } from './Controls';

const factory = create({ store });

export default factory(function MenuProvider({ middleware: { store: { get, path, executor } }}){
	const props: ControlsProperties = {
		isConnected: get(path('isConnected')),
		isSharing: get(path('isSharing')),
		isAuthenticated: get(path('auth', 'isAuthenticated')),
		onConnect: () => { executor(connectProcess)({}) },
		onDisconnect: () => { executor(disconnectProcess)({}) },
		onNextSlide: () => { executor(nextSlideProcess)({}) },
		onPreviousSlide: () => { executor(previousSlideProcess)({}) },
		onShare: () => { executor(shareScreenProcess)({}) },
		onStopSharing: () => { executor(stopSharingScreenProcess)({}) }
	};

	return (
		<Controls {... props} />
	);
});
