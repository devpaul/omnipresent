import { create, tsx } from '@dojo/framework/core/vdom';

import { store } from '../../../middleware/store';
import { positionToString } from '../../../utils/position';

export interface ScreenProperties {
}

const factory = create({ store }).properties<ScreenProperties>();

export const Screen = factory(function index({ properties, middleware: { store: { get, path } } }){
	const source = get(path('space', 'screen', 'source'));
	const position = get(path('space', 'screen', 'position'));

	if (!position || !source) {
		return null;
	}
	const positionStr = positionToString(position);
	const shared = {
		position: positionStr,
		geometry: 'width: 1.8'
	}

	switch (source?.type) {
		case 'slide':
			return (<a-plane {...shared} material={`src: url(${source.src});npot: true`}></a-plane>);
		case 'image':
			return (<a-plane {...shared} material={`src: url(${source.src});npot: true`}></a-plane>);
		case 'video':
			return (<a-plane {...shared} material={`src: url(${source.src})`}></a-plane>);
		default:
			return (<a-plane {...shared} color="#000000"></a-plane>);
	}
});
