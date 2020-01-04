import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './statusItem.m.css';

export type IconName = 'circle' | 'screen' | 'presenter' | 'slides' | 'eyes';
export type StatusName = 'red' | 'green' | 'black';

export interface StatusItemProperties {
	icon: IconName;
	title: string;
	status: boolean | StatusName
}

const factory = create().properties<StatusItemProperties>();

export default factory(function StatusItem({ properties }){
	const { icon, title, status } = properties();
	const iconCss = css[icon];
	const statusName = typeof status === 'boolean' ? (status ? 'green' : 'red') : status;
	const statusCss = css[statusName];

	return (
		<div classes={css.root}>
			<span classes={[iconCss, statusCss]}></span><span>{title}</span>
		</div>
	);
});
