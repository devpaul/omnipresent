import { create, tsx } from '@dojo/framework/core/vdom';

import { PreviewType } from '../../interfaces';
import AuthenticationProvider from '../authentication/Authentication.provider';
import Card from '../card/Card';
import Control from '../control/Control';
import * as css from './controls.m.css';

export interface ControlsProperties {
	isConnected: boolean;
	isAuthenticated: boolean;
	isSharing: boolean;
	showPreview?: PreviewType | false;

	onShare?: () => void;
	onStopSharing?: () => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
	onNextSlide?: () => void;
	onPreviousSlide?: () => void;
}

const factory = create().properties<ControlsProperties>();

export default factory(function Controls({ properties }){
	const { isAuthenticated, showPreview, isConnected, isSharing, onConnect, onDisconnect, onStopSharing, onShare, onNextSlide, onPreviousSlide } = properties();

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
			{ isConnected && <Card title="Slides">
				<Control title="Next Slide" show={isConnected} onClick={ () => { onNextSlide?.() }} />
				<Control title="Previous Slide" show={isConnected} onClick={ () => { onPreviousSlide?.() }} />
			</Card> }
			{ isSharing && <Card title="Preview">
				<Control title="Hide Preview" show={!!showPreview} onClick={ () => { console.log('TODO') }} />
				<Control title="Image Preview" show={showPreview !== 'image'} onClick={ () => { console.log('TODO') }} />
				<Control title="Video Preview" show={showPreview !== 'video'} onClick={ () => { console.log('TODO') }} />
			</Card> }
		</div>
	);
});
