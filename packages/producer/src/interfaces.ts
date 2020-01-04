export interface State {
	request: Requests;
	isConnected: boolean;
	isSharing: boolean;
	stats: ShowStats;
	slide?: number;
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
