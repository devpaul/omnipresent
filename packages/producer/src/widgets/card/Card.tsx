import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { alwaysRender } from '@dojo/framework/core/decorators/alwaysRender';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/core/mixins/Themed';
import * as css from './card.m.css';
import { DNode } from '@dojo/framework/core/interfaces';

export interface CardProperties extends ThemedProperties {
	title: string;
	/** Renderer for action available from the card */
	actionsRenderer?(): RenderResult;
}

@theme(css)
@alwaysRender()
export class Card extends ThemedMixin(WidgetBase)<CardProperties> {
	protected render(): DNode {
		const { title, actionsRenderer } = this.properties;
		const actionsResult = actionsRenderer && actionsRenderer();
		return (
			<div key="root" classes={this.theme(css.root)}>
				<header classes={css.title}>{title}</header>
				{this.children}
				{actionsResult && <div classes={this.theme(css.actions)}>{actionsResult}</div>}
			</div>
		);
	}
}

export default Card;
