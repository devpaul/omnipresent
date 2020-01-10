import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../../middleware/store';
import { Screen } from '../screen';
import Controls from '../controls/Controls';

const factory = create({ store }).properties();

export default factory(function Scene({ middleware: { store: { get, path }}}){
	const { color } = get(path('space', 'sky'));

	return (
		<a-scene>
			<a-assets>
				<video id="vrscreen" playsinline></video>
			</a-assets>
			<a-sky color={color}></a-sky>
			<Screen/>
			<Controls />
		</a-scene>
	);
});
