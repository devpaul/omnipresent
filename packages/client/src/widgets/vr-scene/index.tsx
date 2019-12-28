import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import { positionToString } from '../../utils/position';

export interface VrSceneProperties {
}

const factory = create({ store }).properties<VrSceneProperties>();

export default factory(function VrScene({ middleware: { store: { get, path }}}){
	const { sky, screen } = get(path('space'));

	return (
		<a-scene>
			<a-assets>
				<video id="vrscreen" playsinline></video>
			</a-assets>
			<a-sky color={sky.color}></a-sky>
			{ screen && <a-plane color="#FFFFFF" position={positionToString(screen.position)} material="src: #vrscreen" geometry="width: 1.8"></a-plane> }
			<a-tracked-controls hand="left"></a-tracked-controls>
			<a-tracked-controls hand="right"></a-tracked-controls>
		</a-scene>
	);
});
