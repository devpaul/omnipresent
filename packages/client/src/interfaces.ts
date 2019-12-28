export interface State {
	/** If the current user has authenticated as the presenter */
	presenter: boolean;
	/** If the user is connected to websockets */
	connected: boolean;
	/** If the menu should be displayed */
	openMenu: boolean;

	/** Describes the presentation space */
	space: Space;
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
}

export interface Position {
	x: number;
	y: number;
	z: number;
}
