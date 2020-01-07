import { create, tsx } from '@dojo/framework/core/vdom';

import { screen } from '../../../middleware/screen';
import * as css from './videoPreview.m.css';

export interface VideoPreviewProperties {
	open: boolean;
}

const factory = create({ screen });

export default factory(function VideoPreview({ properties, middleware: { screen } }) {
	const media = screen.getMediaSource();
	return (
		<div>
			{ media && <video key="vid" classes={css.video} srcObject={media} muted={true} autoplay /> }
		</div>
	);
});
