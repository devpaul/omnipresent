import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './menu.m.css';

export interface MenuProperties {
	isConnected: boolean;
	isSharing: boolean;

	onShare?: () => void;
	onStopSharing?: () => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
	onSnapshot?: () => void;
	onNextSlide?: () => void;
	onPreviousSlide?: () => void;
}

const factory = create().properties<MenuProperties>();

export default factory(function Menu({ properties }){
	const { isConnected, isSharing, onConnect, onDisconnect, onStopSharing, onShare, onSnapshot, onNextSlide, onPreviousSlide } = properties();

	return (
		<div classes={css.root}>
			<ul>
				{ isConnected && <li><button onclick={() => { onDisconnect?.() } }>Disconnect</button></li> }
				{ !isConnected && <li><button onclick={() => { onConnect?.() } }>Connect</button></li> }
				{ !isSharing && <li><button onclick={() => { onShare?.() } }>Share Screen</button></li> }
				{ isSharing && <li><button onclick={() => { onStopSharing?.() } }>Stop Sharing Screen</button></li> }
				{ isSharing && <li><button onclick={() => { onSnapshot?.() } }>Take Snapshot</button></li> }
				{ isConnected && <li><button onclick={() => { onNextSlide?.() } }>Next Slide</button></li> }
				{ isConnected && <li><button onclick={() => { onPreviousSlide?.() } }>Previous Slide</button></li> }
			</ul>
		</div>
	);
});
