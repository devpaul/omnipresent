import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../../middleware/store';
import { Screen } from '../screen';

const factory = create({ store }).properties();

export default factory(function Scene({ middleware: { store: { get, path }}}){
	const { color } = get(path('space', 'sky'));
	const screen = get(path('space', 'screen'));

	return (
		<a-scene>
			<a-assets>
				<video id="vrscreen" playsinline></video>
			</a-assets>
			<a-sky color={color}></a-sky>
			{ screen && <Screen { ... screen }></Screen> }
			<a-tracked-controls hand="left"></a-tracked-controls>
			<a-tracked-controls hand="right"></a-tracked-controls>
		</a-scene>
	);
});
