import { create, tsx } from '@dojo/framework/core/vdom';

import { store } from '../../../middleware/store';
import * as css from './slidePreview.m.css';
import { getSlideUrl, DECKNAME } from '../../../config';
import { SlideIndex } from 'present-core/api/websocket/revealjs';

export interface SlidePreviewProperties {
	slide: SlideIndex;
}

const factory = create({ store }).properties<SlidePreviewProperties>();

export default factory(function SlidePreview({ properties }){
	const {slide} = properties();

	if (!slide) {
		return null;
	}

	const file = getSlideUrl(slide, DECKNAME);

	return (
		<div>
			<img key="img" classes={css.image} src={file} />
		</div>
	);
});
