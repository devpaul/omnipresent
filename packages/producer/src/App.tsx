import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import dojo from '@dojo/themes/dojo';

import * as css from './app.m.css';
import { store } from './middleware/store';
import ControlsProvider from './widgets/controls/Controls.provider';
import Preview from './widgets/preview/Preview';
import StatusProvider from './widgets/status/Status.provider';

const factory = create({ theme, store });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	return (<div classes={css.root}>
		<div classes={css.container}>
			<div>
				<ControlsProvider />
			</div>
			<div classes={css.previewContainer}>
				<Preview />
			</div>
		</div>
		<StatusProvider />
	</div>)
});
