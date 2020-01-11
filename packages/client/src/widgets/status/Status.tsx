import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './status.m.css';

export interface StatusProperties {
	value: boolean;
	trueLabel: string;
	falseLabel: string;
}

const factory = create().properties<StatusProperties>();

export default factory(function Status({ properties }){
	const { value, trueLabel, falseLabel } = properties();
	return (
		<div classes={css.root}>
			<span classes={[css.dot, value ? css.green : css.red]}></span>
			<span>{value ? trueLabel : falseLabel }</span>
		</div>
	);
});
