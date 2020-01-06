export interface State {
	auth: Authentication;
	request: Requests;
	isConnected: boolean;
	isSharing: boolean;
	showPreview: PreviewType | false;
	slide?: SlideIndex;
	stats: ShowStats;
}

export type PreviewType = 'image' | 'video';

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
