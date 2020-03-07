import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import dojo from '@dojo/themes/dojo';

import Menu from './widgets/menu';
import { WelcomeDialog } from './widgets/welcomeDialog/WelcomeDialog';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	return <virtual>
		<WelcomeDialog />
		<Menu />
	</virtual>
});
