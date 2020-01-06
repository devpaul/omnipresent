import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import Controls, { ControlsProperties } from './Controls';
import { shareScreenProcess, stopSharingScreenProcess, snapshotProcess } from '../../processes/webrtc.process';
import { connectProcess, disconnectProcess } from '../../processes/connection.process';
import { nextSlideProcess, previousSlideProcess } from '../../processes/slides.process';

const factory = create({ store });

export default factory(function MenuProvider({ middleware: { store: { get, path, executor } }}){
	const props: ControlsProperties = {
		isConnected: get(path('isConnected')),
		isSharing: get(path('isSharing')),
		isAuthenticated: get(path('auth', 'isAuthenticated')),
		showPreview: get(path('showPreview')),
		onConnect: () => { executor(connectProcess)({}) },
		onDisconnect: () => { executor(disconnectProcess)({}) },
		onNextSlide: () => { executor(nextSlideProcess)({}) },
		onPreviousSlide: () => { executor(previousSlideProcess)({}) },
		onShare: () => { executor(shareScreenProcess)({}) },
		onStopSharing: () => { executor(stopSharingScreenProcess)({}) },
		onSnapshot: () => { executor(snapshotProcess)({}) }
	};

	return (
		<Controls {... props} />
	);
});
