export const enum Action {
	Authenticate = 'authenticate',
	GetStatus = 'getStatus',
	HideLaser = 'hideLaser',
	NextSlide = 'nextSlide',
	PreviousSlide = 'previousSlide',
	RoleConnected = 'roleConnected',
	RoleLeft = 'roleLeft',
	ShowMedia = 'showMedia',
	ShowLaser = 'showLaser',
	SlideChanged = 'slideChanged'
}

export const enum Response {
	Authenticated = 'authenticated',
	NotAuthenticated = 'notAuthenticated',
	Status = 'status'
}
