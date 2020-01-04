import { getMenuContainer, getMenuCloseButton } from "./elements";
import { connect as connectSocket, disconnect as disconnectService } from '/present-core/websocket/connection';
import { handleNextSlide, handlePreviousSlide } from '/present-core/api/websocket/revealjs';

export function openMenu() {
	getMenuContainer()?.classList.add('opened');
}

export function closeMenu() {
	getMenuContainer()?.classList.remove('opened');
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
}
