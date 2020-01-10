import { create, tsx } from '@dojo/framework/core/vdom';

export interface ControlsProperties {

}

const factory = create().properties<ControlsProperties>();

export default factory(function Controls({ }){

	return (
		<virtual>
			<a-entity oculus-touch-controls="hand: left"></a-entity>
			<a-entity oculus-touch-controls="hand: right"></a-entity>
		</virtual>
	);
});
