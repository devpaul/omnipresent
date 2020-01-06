import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import dojo from '@dojo/themes/dojo';

import * as css from './app.m.css';
import { store } from './middleware/store';
import ControlsProvider from './widgets/controls/Controls.provider';
import ScreenPreview from './widgets/screen-preview/ScreenPreview';
import StatusProvider from './widgets/status/Status.provider';
import VideoPreview from './widgets/video-preview/VideoPreview';

const factory = create({ theme, store });

export default factory(function App({ middleware: { theme, store } }) {
	const preview = store.get(store.path('showPreview'));

	if (!theme.get()) {
		theme.set(dojo);
	}

	return (<div classes={css.root}>
		<div>
			<div>
				<ControlsProvider />
			</div>
			<div classes={css.previewContainer}>
				{ preview === 'video' && <VideoPreview />}
				{ preview === 'image' && <ScreenPreview />}
			</div>
		</div>
		<StatusProvider />
	</div>)
});
