import { create } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import { getScreenMedia, getScreenshot } from 'present-core/webrtc/screen';

const factory = create({ icache });

export const screen = factory(function ({ middleware: { icache }}) {
	return {
		getMediaSource() {
			const stream = icache.get<MediaSource>('stream');
			if (!stream) {
				getScreenMedia().then((media) => {
					icache.set('stream', media);
				});
			}
			return stream;
		},
		takeScreenshot() {
			const screenshot = icache.get<string>('screenshot');
			if (!screenshot) {
				getScreenshot().then((dataSrc) => {
					icache.set('screenshot', dataSrc);
				});
			}
			icache.set('screenshot', undefined);
			return screenshot;
		}
	}
})
