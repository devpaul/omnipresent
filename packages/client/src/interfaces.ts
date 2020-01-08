import { Media } from 'present-core/api/websocket/screen';

export interface State {
	auth: Authentication;
	/** If the user is the presenter */
	isPresenter: boolean;
	/** If the user is connected to websockets */
	isConnected: boolean;
	/** If the menu should be displayed */
	openMenu: boolean;

	/** Describes the current presentation */
	presentation: Presentation;

	/** Describes the presentation */
	space: Space;
}

export interface Authentication {
	secret?: string;
	isAuthenticated: boolean;
}

export interface Presentation {
	live: boolean;
	name: string;
	description: string;
	location: string;
}

export interface Space {
	sky: Sky;
	screen?: Screen;
}

export interface Sky {
	color: string;
}

export interface Screen {
	position: Position;
	source?: Media;
}

export interface Position {
	x: number;
	y: number;
	z: number;
}
