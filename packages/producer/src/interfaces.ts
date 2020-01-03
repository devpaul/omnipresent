export interface State {
	request: Requests;
	isConnected: boolean;
	isSharing: boolean;
}

export interface Requests {
	[key: string]: RequestDetails;
}

export interface RequestDetails {
	isLoading: boolean | undefined;
	message?: string;
	error?: Error;
}
