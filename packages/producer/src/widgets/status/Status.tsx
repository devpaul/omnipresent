import { create, tsx } from '@dojo/framework/core/vdom';
import { ShowStats } from '../../interfaces';
import StatusItem from '../status-item/StatusItem';

export interface StatusProperties extends ShowStats {
	isConnected: boolean;
	isSharing: boolean;
	currentSlide?: number;
}

const factory = create().properties<StatusProperties>();

export default factory(function Status({ properties }){
	const { isConnected, isSharing, isPresenterConnected, areSlidesConnected, connectionCount, currentSlide } = properties();

	return (<div>
		<StatusItem icon="circle" title={isConnected ? 'connected' : 'disconnected' } status={isConnected} />
		<StatusItem icon="screen" title={isSharing ? 'sharing' : 'not sharing' } status={isSharing} />
		<StatusItem icon="presenter" title={isPresenterConnected ? 'presenter' : 'no presenter' } status={isPresenterConnected} />
		<StatusItem icon="slides" title={areSlidesConnected ? (currentSlide != null ? `slide ${currentSlide}` : 'slides connected') : 'no slides' } status={areSlidesConnected} />
		<StatusItem icon="eyes" title={`${connectionCount} connections`} status="black" />
	</div>);
});
