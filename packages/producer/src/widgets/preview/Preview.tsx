import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import { icache } from '@dojo/framework/core/middleware/icache';
import * as css from './preview.m.css';
import VideoPreview from './video/VideoPreview';
import ImagePreview from './image/ImagePreview';
import SlidePreview from './slide/SlidePreview';
import ScreenPreview from './screen/ScreenPreview';

export interface PreviewProperties {
}

const factory = create({ store, icache }).properties<PreviewProperties>();

export default factory(function Preview({ middleware: { icache, store: { get, path }} }){
	const isSharing = get(path('isSharing'));
	const type = icache.get('type');
	const slide = get(path('slide'));
	const media = get(path('screen', 'media'));

	return (
		<div classes={css.root}>
			<header>
				<button disabled={!slide} onclick={() => { icache.set('type', 'slide')}}>Show Slide</button>
				<button disabled={!media} onclick={() => { icache.set('type', 'screen')}}>View Screen</button>
				<button disabled={!isSharing} onclick={() => { icache.set('type', 'image')}}>Take Snapshot</button>
				<button disabled={!isSharing} onclick={() => { icache.set('type', 'video')}}>Live Preview</button>
				<button disabled={!isSharing || !type} onclick={() => { icache.set('type', undefined)}}>Stop</button>
			</header>
			{ isSharing && <div>
				{ type === 'video' && <VideoPreview />}
				{ type === 'image' && <ImagePreview />}
			</div> }
			{ type === 'slide' && <SlidePreview slide={slide}/>}
			{ type === 'screen' && <ScreenPreview media={media}/>}
		</div>
	);
});
