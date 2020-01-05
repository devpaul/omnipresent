import { create, tsx } from '@dojo/framework/core/vdom';
import cache from '@dojo/framework/core/middleware/cache';
import { screen } from '../../middleware/screen';
import Dialog from '@dojo/widgets/dialog'

const factory = create({ screen, cache });

export default factory(function ScreenPreview({ middleware: { screen, cache } }){
	let screenshot = cache.get<string>('screenshot');
	if (!screenshot) {
		const dataUrl = screen.takeScreenshot();
		if (dataUrl) {
			cache.set('screenshot', dataUrl);
			screenshot = dataUrl;
		}
	}

	return (
		<Dialog open={true} closeable={true} title="Preview">
			{ screenshot && <img src={screenshot} /> }
		</Dialog>
	);
});
