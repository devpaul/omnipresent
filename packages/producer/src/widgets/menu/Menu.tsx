import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './menu.m.css';

export interface MenuProperties {
	isConnected: boolean;
	isSharing: boolean;

	onShare?: () => void;
	onStopSharing?: () => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
}

const factory = create().properties<MenuProperties>();

export default factory(function Menu({ properties }){
	const { isConnected, isSharing } = properties();

	return (<div classes={css.root}>
	<div class="popup">
		<div class="close-container">
			<button class="close buttonlink">X</button>
		</div>
		<header>
			<h1>Present Controls</h1>
		</header>
		<div>
			<div class="connected-container">
				<span class="indicator"></span><span class="message"></span>
			</div>
			<ul class="menu-options">
				{ !isSharing && <li><button class="share buttonlink">Share Screen</button></li> }
				<li><button class="stopSharing buttonlink">Stop Sharing</button></li>
				<li><button class="snapshot buttonlink">Take Snapshot</button></li>
				<li><button class="openPreview buttonlink">Open Preview</button></li>
				{ !isConnected && <li><button class="connect buttonlink">Connect</button></li> }
				<li><button class="disconnect buttonlink">Disconnect</button></li>
			</ul>
		</div>
	</div>
</div>)
});
