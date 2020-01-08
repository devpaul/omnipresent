import { ImageMedia, VideoMedia, SlideMedia } from 'present-core/api/websocket/screen';

export interface State {
	auth: Authentication;
	request: Requests;
	isConnected: boolean;
	isSharing: boolean;
	screen: Screen;
	slide?: SlideIndex;
	stats: ShowStats;
	options: Options;
}

export interface Screen {
	media: ImageMedia | VideoMedia | SlideMedia;
}

export interface Options {
	captureSlides: boolean;
	syncToSlides: boolean;
}

export interface Authentication {
	secret?: string;
	isAuthenticated: boolean;
}

export interface SlideIndex {
	h: number;
	v: number;
}

export interface Requests {
	[key: string]: RequestDetails;
}

export interface RequestDetails {
	isLoading: boolean | undefined;
	message?: string;
	error?: Error;
}

export interface ShowStats {
	isPresenterConnected: boolean;
	areSlidesConnected: boolean;
	connectionCount: number;
}
