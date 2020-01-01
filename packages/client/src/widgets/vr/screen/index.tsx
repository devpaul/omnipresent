import { create, tsx } from '@dojo/framework/core/vdom';
import { positionToString } from '../../../utils/position';
import { Position, MediaSource } from '../../../interfaces';

export interface ScreenProperties {
	position: Position;
	source?: MediaSource;
}

const factory = create().properties<ScreenProperties>();

export const Screen = factory(function index({ properties }){
	const { position, source } = properties();
	const positionStr = positionToString(position);
	const shared = {
		position: positionStr,
		geometry: 'width: 1.8'
	}

	switch (source?.type) {
		case 'deck':
			return (<a-plane {...shared} material={`src: url(${source.slides[source.currentSlide]});npot: true`}></a-plane>);
		case 'image':
			return (<a-plane {...shared} material={`src: url(${source.url});npot: true`}></a-plane>);
		case 'video':
			return (<a-plane {...shared} material={`src: url(${source.url})`}></a-plane>);
		default:
			return (<a-plane {...shared} color="#000000"></a-plane>);
	}
});
