import { create, tsx } from '@dojo/framework/core/vdom';
import { store } from '../../middleware/store';
import SlidePane from '@dojo/widgets/slide-pane';
import Hamburger from '../hamburger';
import { openMenuProcess, closeMenuProcess } from '../../processes/menu.process';
import { Card } from '../card/Card';
import Status from '../status/Status';
import Control from '../control/Control';
import Authentication from '../authentication/Authentication';
import { connectProcess, disconnectProcess } from '../../processes/connection.process';

import * as css from './menu.m.css';

const factory = create({ store });

export default factory(function Menu({ middleware: { store: { get, path, executor } }}){
	const isMenuOpen = get(path('openMenu'));
	const isConnected = get(path('isConnected'));
	const isPresenter = get(path('isPresenter'));
	const isAuthenticated = get(path('auth', 'isAuthenticated'));
	const openMenu = executor(openMenuProcess);
	const closeMenu = executor(closeMenuProcess);
	const connect = executor(connectProcess);
	const disconnect = executor(disconnectProcess);

	return <virtual>
		{ !isMenuOpen && <Hamburger onClick={() => { openMenu({}) }}></Hamburger> }
		<SlidePane open={isMenuOpen} classes={{
			'@dojo/widgets/slide-pane': {
				'content': [css.pane]
			}
		}}>
			<div classes={css.closeContainer}>
				<button id="close-menu" classes={css.closeButton} onclick={() => { closeMenu({}) }}>X</button>
			</div>
			<Card title="Connection">
				<div classes={css.indentedContainer}>
					<Status value={isConnected} trueLabel="Connected" falseLabel="Disconnected" />
					<Status value={isAuthenticated} trueLabel="Authenticated" falseLabel="Not Authenticated" />
					{ isAuthenticated && <Status value={isPresenter} trueLabel="Presenting" falseLabel="Not Presenting" /> }
				</div>
			</Card>
			<Card title="Connection">
				<Control show={isConnected} title="Disconnect" onClick={() => { disconnect({}) }}/>
				<Control show={!isConnected} title="Connect" onClick={() => { connect({}) }}/>
			</Card>
			<Card title="External Links">
				<div classes={css.indentedContainer}>
					<a href="/slides/">View Slides</a>
				</div>
			</Card>
			{ isAuthenticated && <Card title="Presenter">
				<Control show={!isPresenter} title="Start Presenting" onClick={() => { }}/>
			</Card> }
			{ !isAuthenticated && <Card title="Authentication">
				<Authentication />
			</Card> }
		</SlidePane>
	</virtual>
});
