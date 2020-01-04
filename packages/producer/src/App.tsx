import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import dojo from '@dojo/themes/dojo';

import MenuProvider from './widgets/menu/Menu.provider';
import StatusProvider from './widgets/status/Status.provider';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (<div>
		<StatusProvider />
		<MenuProvider />
	</div>)
});
