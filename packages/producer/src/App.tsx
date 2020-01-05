import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import dojo from '@dojo/themes/dojo';
import Outlet from '@dojo/framework/routing/Outlet';
import MenuProvider from './widgets/menu/Menu.provider';
import StatusProvider from './widgets/status/Status.provider';
import VideoPreview from './widgets/video-preview/VideoPreview';
import ScreenPreview from './widgets/screen-preview/ScreenPreview';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (<div>
		<MenuProvider />
		<Outlet
			id="videoPreview"
			key="videoPreviewOutlet"
			renderer={() => (
				<VideoPreview />
			)}
		/>
		<Outlet
			id="preview"
			key="previewOutlet"
			renderer={() => (
				<ScreenPreview />
			)}
		/>
		<StatusProvider />
	</div>)
});
