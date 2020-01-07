import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import { icache } from '@dojo/framework/core/middleware/icache';
import * as css from './preview.m.css';
import VideoPreview from './video/VideoPreview';
import ImagePreview from './image/ImagePreview';

export interface PreviewProperties {
}

const factory = create({ store, icache }).properties<PreviewProperties>();

export default factory(function Preview({ middleware: { icache, store: { get, path }} }){
	const isSharing = get(path('isSharing'));
	const type = icache.get('type');

	return (
		<div classes={css.root}>
			<header>
				<button disabled={!isSharing} onclick={() => { icache.set('type', 'slide')}}>Show Slide</button>
				<button disabled={!isSharing} onclick={() => { icache.set('type', 'image')}}>Take Snapshot</button>
				<button disabled={!isSharing} onclick={() => { icache.set('type', 'video')}}>Live Preview</button>
				<button disabled={!isSharing || !type} onclick={() => { icache.set('type', undefined)}}>Stop</button>
			</header>
			{ isSharing && <div>
				{ type === 'video' && <VideoPreview />}
				{ type === 'image' && <ImagePreview />}
			</div> }
		</div>
	);
});
