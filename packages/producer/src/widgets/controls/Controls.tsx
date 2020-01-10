import { create, tsx } from '@dojo/framework/core/vdom';

import AuthenticationProvider from '../authentication/Authentication.provider';
import Card from '../card/Card';
import Control from '../control/Control';
import Checkbox, { Mode } from '@dojo/widgets/checkbox'
import * as css from './controls.m.css';

export interface ControlsProperties {
	isConnected: boolean;
	isAuthenticated: boolean;
	isSharing: boolean;
	captureSlides: boolean;
	syncToSlides: boolean;

	onShare?: () => void;
	onStopSharing?: () => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
	onNextSlide?: () => void;
	onPreviousSlide?: () => void;
	onSetCaptureSlides?: (value: boolean) => void;
	onSetSyncToSlides?: (value: boolean) => void;
}

const factory = create().properties<ControlsProperties>();

export default factory(function Controls({ properties }){
	const { isAuthenticated, isConnected, isSharing, onConnect, onDisconnect, onStopSharing, onShare, onNextSlide, onPreviousSlide, onSetCaptureSlides, captureSlides,
		syncToSlides, onSetSyncToSlides } = properties();

	return (
		<div classes={css.root}>
			<Card title="Connection">
				<Control title="Disconnect" show={isConnected} onClick={ () => { onDisconnect?.() }} />
				<Control title="Connect" show={!isConnected} onClick={ () => { onConnect?.() }} />
			</Card>
			{ !isAuthenticated && <Card title="Authentication">
				<AuthenticationProvider />
			</Card>}
			<Card title="Sharing">
				<Control title="Share Screen" show={!isSharing} onClick={ () => { onShare?.() }} />
				<Control title="Stop Sharing" show={isSharing} onClick={ () => { onStopSharing?.() }} />
			</Card>
			<Card title="Screen">
				<div classes={css.indent}>
					<Checkbox checked={syncToSlides} label="Sync Viewers to Slides" mode={Mode.toggle} onChange={() => { onSetSyncToSlides?.(!syncToSlides)}}/>
				</div>
				<div classes={css.indent}>
					<Checkbox disabled={!isSharing} checked={captureSlides} label="Capture Slides" mode={Mode.toggle} onChange={() => { onSetCaptureSlides?.(!captureSlides)}}/>
				</div>
			</Card>
			{ isConnected && <Card title="Slides">
				<Control title="Next Slide" show={isConnected} onClick={ () => { onNextSlide?.() }} />
				<Control title="Previous Slide" show={isConnected} onClick={ () => { onPreviousSlide?.() }} />
			</Card> }
		</div>
	);
});