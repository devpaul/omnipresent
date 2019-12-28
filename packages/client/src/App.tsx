import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import Menu from './widgets/menu';
import VrScene from './widgets/vr-scene';
import dojo from '@dojo/themes/dojo';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	return <virtual>
		<Menu></Menu>
		<VrScene></VrScene>
	</virtual>
});
