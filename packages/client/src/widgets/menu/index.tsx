import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import SlidePane from '@dojo/widgets/slide-pane';
import Hamburger from '../hamburger';
import { openMenuProcess, closeMenuProcess } from '../../process/menu.process';

export interface MenuProperties {
}

const factory = create({ store }).properties<MenuProperties>();

export default factory(function Menu({ middleware: { store: { get, path, executor } }}){
	const connected = get(path('connected'));
	const isMenuOpen = get(path('openMenu'));
	const openMenu = executor(openMenuProcess);
	const closeMenu = executor(closeMenuProcess);

	return <virtual>
		{ !isMenuOpen && <Hamburger onClick={() => { openMenu({}) }}></Hamburger> }
		<SlidePane open={isMenuOpen}>
			<button id="close-menu" onclick={() => { closeMenu({}) }}>X</button>
			<ul>
				<li>{connected ? 'connected' : 'disconnected'}</li>
			</ul>
		</SlidePane>
	</virtual>
});
