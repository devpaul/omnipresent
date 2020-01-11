import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import SlidePane from '@dojo/widgets/slide-pane';
import Hamburger from '../hamburger';
import { openMenuProcess, closeMenuProcess, viewSlidesProcess } from '../../process/menu.process';

import * as css from './menu.m.css';
import { disconnect } from '../../externals/connection';
import { connect } from 'present-core/websocket/connection';

const factory = create({ store });

export default factory(function Menu({ middleware: { store: { get, path, executor } }}){
	const isConnected = get(path('isConnected'));
	const isPresenter = get(path('isPresenter'));
	const isMenuOpen = get(path('openMenu'));
	const isAuthenticated = get(path('auth', 'isAuthenticated'));
	const openMenu = executor(openMenuProcess);
	const closeMenu = executor(closeMenuProcess);
	const viewSlides = executor(viewSlidesProcess);

	return <virtual>
		{ !isMenuOpen && <Hamburger onClick={() => { openMenu({}) }}></Hamburger> }
		<SlidePane open={isMenuOpen}>
			<div classes={css.closeContainer}>
				<button id="close-menu" classes={css.linkButton} onclick={() => { closeMenu({}) }}>X</button>
			</div>
			<div>
				<span classes={[css.dot, isConnected ? css.green : css.red]}></span>
				<span>{isConnected ? 'connected' : 'disconnected' }</span>
			</div>
			<div>
				<span classes={[css.dot, isAuthenticated ? css.green : css.red]}></span>
				<span>{isAuthenticated ? 'authenticated' : 'not authenticated' }</span>
			</div>
			<ul>
				{ isConnected && <li><button onclick={ () => { disconnect() }} classes={css.linkButton}>Disconnect</button></li> }
				{ !isConnected && <li><button onclick={ () => { connect() }} classes={css.linkButton}>Attend Presentation</button></li> }
				{ isConnected && !isPresenter && <li><button classes={css.linkButton}>Become Presenter</button></li> }
				<li><button onclick={ () => { viewSlides({}); }} classes={css.linkButton}>View Slides</button></li>
			</ul>
		</SlidePane>
	</virtual>
});
