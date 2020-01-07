import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../../middleware/store';
import { Screen } from '../../../interfaces';
import * as css from './screenPreview.m.css';

export interface ScreenPreviewProperties {
	media?: Screen['media'];
}

const factory = create({ store }).properties<ScreenPreviewProperties>();

export default factory(function ScreenPreview({ properties }){
	const {media} = properties();

	return (
		<div>
			{ !media && <p>No media</p>}
			{ media?.type === 'slide' && <img classes={css.media} src={media.src} /> }
			{ media?.type === 'image' && <img classes={css.media} src={media.src} /> }
			{ media?.type === 'video' && <video classes={css.media} src={media.src} />}
		</div>
	);
});
