export interface State {
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
	source?: MediaSource;
}

export type MediaSource = ImageSource | VideoSource | DeckSource;

export interface ImageSource {
	type: 'image';
	url: string;
}

export interface VideoSource {
	type: 'video';
	url: string;
}

export interface DeckSource {
	type: 'deck';
	currentSlide: number;
	slides: string[];
}

export interface Position {
	x: number;
	y: number;
	z: number;
}
