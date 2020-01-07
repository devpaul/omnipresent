import cache from '@dojo/framework/core/middleware/cache';
import { create, tsx } from '@dojo/framework/core/vdom';

import { screen } from '../../../middleware/screen';
import * as css from './imagePreview.m.css';

export interface ScreenPreviewProperties {
}

const factory = create({ screen, cache }).properties<ScreenPreviewProperties>();

export default factory(function ScreenPreview({ properties, middleware: { screen, cache } }){
	let screenshot = cache.get<string>('screenshot');
	if (!screenshot) {
		const dataUrl = screen.takeScreenshot();
		if (dataUrl) {
			cache.set('screenshot', dataUrl);
			screenshot = dataUrl;
		}
	}

	return (
		<div>
			{ screenshot && <img key="img" classes={css.image} src={screenshot} /> }
		</div>
	);
});
