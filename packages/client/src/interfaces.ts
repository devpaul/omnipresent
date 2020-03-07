import { Media } from 'present-core/api/websocket/screen';
import { CharacterPose } from 'present-core/api/websocket/presenter';

export interface State {
	auth: Authentication;
	/** If the user is the presenter */
	isPresenter: boolean;
	/** If the user is connected to websockets */
	isConnected: boolean;
	/** If the user is in VR */
	isInVr: boolean;
	/** If the menu should be displayed */
	openMenu: boolean;
	/** display WelcomeDialog */
	showWelcome: boolean;
	/** show the loading indicator */
	isLoading: boolean;

	/** Describes the presentation */
	space: Space;

	data: {
		/** a list of available live or recorded presentations */
		presentations: ListResponse<Presentation>;
	}
}

export interface ListResponse<T, Q extends object = object> extends Response<T[], Q> {
	length: number;
}

export interface Response<T, Q extends object = object> {
	data: T,
	isLoading: boolean;
	error: any;
	query?: Q;
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
	presenter?: CharacterPose;
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
