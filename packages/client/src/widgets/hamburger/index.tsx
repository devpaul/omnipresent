import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './hamburger.m.css';
const menuImage = require('./menu.svg');

export interface indexProperties {
	onClick: () => void;
}

const factory = create().properties<indexProperties>();

export default factory(function index({ properties }){
	const { onClick } = properties();
	return (<div classes={css.root}>
		<button id="hamburger" onclick={onClick}>
			<img src={menuImage} />
		</button>
	</div>);
});
