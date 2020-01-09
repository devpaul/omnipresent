import { getMenuContainer, getMenuCloseButton } from "./elements";
import { connect as connectSocket, disconnect as disconnectService } from 'present-core/websocket/connection';
import { handleNextSlide, handlePreviousSlide, slideChanged } from 'present-core/api/websocket/revealjs';
import { handleAuthenticated, handleAuthenticateError, authenticate } from "present-core/api/websocket/authenticate";

export function openMenu() {
	getMenuContainer()?.classList.add('opened');
}

export function closeMenu() {
	getMenuContainer()?.classList.remove('opened');
}

export function sendAuthentication(secret: string | null= localStorage.getItem('secret')) {
	if (secret) {
		localStorage.setItem('secret', secret);
		authenticate({
			role: 'slides',
			secret
		});
	}
}

export async function connect() {
	const socket = await connectSocket();
	document.body.classList.add('connected');
	socket.addEventListener('close', () => {
		document.body.classList.remove('connected');
	});
	(window as any).sock = socket;

	handleNextSlide(() => {
		Reveal.next();
	});

	handlePreviousSlide(() => {
		Reveal.prev();
	});

	handleAuthenticated(() => {
		document.body.classList.add('authenticated');
		const index = Reveal.getIndices();
		slideChanged(index);
	});

	handleAuthenticateError(() => {
		document.body.classList.remove('authenticated');
		localStorage.removeItem('secret');
	});

	sendAuthentication();
}
