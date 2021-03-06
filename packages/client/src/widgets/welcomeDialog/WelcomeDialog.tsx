import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import Dialog from '@dojo/widgets/dialog';
import { store } from '../../middleware/store';
import { openMenuProcess as openMenu } from '../../processes/menu.process';

export interface DialogProperties {
}

const factory = create({ icache, store }).properties<DialogProperties>();

export const WelcomeDialog = factory(function({ properties, middleware: { icache, store } }){
	const open = icache.getOrSet('isOpen', true);

	return (
		<Dialog title="Welcome" closeable={true} open={open} onRequestClose={() => {
			icache.set('isOpen', false);
			store.executor(openMenu)({});
		}}>
			<p>Thanks to <a href="https://halfstackconf.com/phoenix/2020/">HalfStack Phoenix</a> for a great event!</p>
			<p>I am updating OmniPresent to replay &quot;A Step Into VR&quot; with audio and video
				of the live presentation. In the meantime, please feel free to connect and look through
				the slides in VR or on your 2d device.
			</p>
		</Dialog>
	);
});
