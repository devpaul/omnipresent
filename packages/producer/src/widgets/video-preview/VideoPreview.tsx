import { create, tsx } from '@dojo/framework/core/vdom';
import Dialog from '@dojo/widgets/dialog';

import { screen } from '../../middleware/screen';

export interface VideoPreviewProperties {
	open: boolean;
}

const factory = create({ screen });

export default factory(function VideoPreview({ properties, middleware: { screen } }) {
	const media = screen.getMediaSource();
	return (
		<Dialog open={true} closeable={true} title="ScreenShare">
			{ media && <video key="vid" srcObject={media} muted={true} autoplay /> }
		</Dialog>
	);
});
