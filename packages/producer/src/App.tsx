import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import dojo from '@dojo/themes/dojo';

import Menu from './widgets/menu/Menu';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (<div>
		<Menu isConnected={false} isSharing={false}></Menu>
	</div>)
});
