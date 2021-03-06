export function getMenuContainer() {
	return document.querySelector('.menu-container');
}

export function getMenuCloseButton() {
	return document.querySelector('.menu-container .close');
}

export function getConnectButton() {
	return document.querySelector('.menu-container .connectButton')
}

export function getAuthButton() {
	return document.querySelector('.menu-container .authenticateButton')
}

export function getAuthInput() {
	return document.querySelector('.menu-container #auth') as undefined | HTMLInputElement;
}
