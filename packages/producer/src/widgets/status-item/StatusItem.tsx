import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './statusItem.m.css';
import theme from '@dojo/framework/core/middleware/theme';


export type IconName = 'circle' | 'screen' | 'presenter' | 'slides' | 'eyes';
export type StatusName = 'red' | 'green' | 'black';

export interface StatusItemProperties {
	icon: IconName;
	title: string;
	status: boolean | StatusName
}

const factory = create({ theme }).properties<StatusItemProperties>();

export default factory(function StatusItem({ properties, middleware: { theme } }){
	const { root } = theme.classes(css);

	const { icon, title, status } = properties();
	const iconCss = css[icon];
	const statusName = typeof status === 'boolean' ? (status ? 'green' : 'red') : status;
	const statusCss = css[statusName];

	return (
		<div classes={[root]}>
			<span classes={[iconCss, statusCss]}></span><span>{title}</span>
		</div>
	);
});
