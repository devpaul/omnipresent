import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './control.m.css';

export interface ControlProperties {
	show?: boolean;
	title: string;
	onClick: () => void;
}

const factory = create().properties<ControlProperties>();

export default factory(function Control({ properties }){
	const { show, title, onClick } = properties();

	if (show === false) {
		return null;
	}

	return (
		<div classes={css.root}>
			<button onclick={() => { onClick?.() } }>{ title }</button>
		</div>
	);
});
