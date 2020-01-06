import { create, tsx } from '@dojo/framework/core/vdom';
import { ShowStats } from '../../interfaces';
import StatusItem from '../status-item/StatusItem';
import * as css from './status.m.css';

export interface StatusProperties extends ShowStats {
	isConnected: boolean;
	isAuthenticated: boolean;
	isSharing: boolean;
	currentSlide?: number;
}

const factory = create().properties<StatusProperties>();

export default factory(function Status({ properties }){
	const { isAuthenticated, isConnected, isSharing, isPresenterConnected, areSlidesConnected, connectionCount, currentSlide } = properties();
	const itemClassOverrides = {
		'present-producer/statusItem': {
			root: [css.item]
		}
	};
	return (<div classes={css.root}>
		<StatusItem classes={itemClassOverrides} icon="circle" title={isConnected ? 'connected' : 'disconnected' } status={isConnected} />
		<StatusItem classes={itemClassOverrides} icon="circle" title={isAuthenticated ? 'authenticated' : 'not authenticated' } status={isAuthenticated} />
		<StatusItem classes={itemClassOverrides} icon="screen" title={isSharing ? 'sharing' : 'not sharing' } status={isSharing} />
		<StatusItem classes={itemClassOverrides} icon="presenter" title={isPresenterConnected ? 'presenter' : 'no presenter' } status={isPresenterConnected} />
		<StatusItem classes={itemClassOverrides} icon="slides" title={areSlidesConnected ? (currentSlide != null ? `slide ${currentSlide}` : 'slides connected') : 'no slides' } status={areSlidesConnected} />
		<StatusItem classes={itemClassOverrides} icon="eyes" title={`${connectionCount} connections`} status="black" />
	</div>);
});
