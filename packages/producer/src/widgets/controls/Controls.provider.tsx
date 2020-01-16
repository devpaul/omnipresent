import { create, tsx } from '@dojo/framework/core/vdom';

import { store } from '../../middleware/store';
import { connectProcess, disconnectProcess } from '../../processes/connection.process';
import {
    nextSlideProcess,
    previousSlideProcess,
    setCaptureSlidesProcess,
    setSyncToSlidesProcess,
	captureSlideProcess,
	setAutoAdvanceProcess,
} from '../../processes/slides.process';
import { shareScreenProcess, stopSharingScreenProcess } from '../../processes/webrtc.process';
import Controls, { ControlsProperties } from './Controls';
import { publishCurrentSlideToScreenProcess } from '../../processes/screen.process';

const factory = create({ store });

export default factory(function MenuProvider({ middleware: { store: { get, path, executor } }}){
	const props: ControlsProperties = {
		isConnected: get(path('isConnected')),
		isSharing: get(path('isSharing')),
		isAuthenticated: get(path('auth', 'isAuthenticated')),
		isAutoAdvance: get(path('options', 'autoAdvanceSlides')),
		captureSlides: get(path('options', 'captureSlides')),
		syncToSlides: get(path('options', 'syncToSlides')),
		onCaptureSlide: async () => {
			await executor(captureSlideProcess)({});
			executor(publishCurrentSlideToScreenProcess)({});
		},
		onConnect: () => { executor(connectProcess)({}) },
		onDisconnect: () => { executor(disconnectProcess)({}) },
		onNextSlide: () => { executor(nextSlideProcess)({}) },
		onPreviousSlide: () => { executor(previousSlideProcess)({}) },
		onShare: () => { executor(shareScreenProcess)({}) },
		onStopSharing: () => { executor(stopSharingScreenProcess)({}) },
		onSetCaptureSlides: value => { executor(setCaptureSlidesProcess)({ value })},
		onSetSyncToSlides: value => {
			executor(setSyncToSlidesProcess)({ value });
			if (value) {
				executor(publishCurrentSlideToScreenProcess)({})
			}
		},
		onAutomaticSlideChange: (value) => { executor(setAutoAdvanceProcess)({ value }) }
	};

	return (
		<Controls {... props} />
	);
});
