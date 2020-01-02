import { getScreenMedia, getScreenshot } from "./screen";
import { getMenuContainer, getPreviewContainer, getPreview, getMenuCloseButton, getShareButton, getSnapshotButton, getPreviewCloseButton, getOpenPreviewButton, getConnectButton, getDisconnectButton } from "./elements";
import { connect, disconnect } from "./connection/connection";

export function openMenu() {
	getMenuContainer()?.classList.add('opened');
}

function closeMenu() {
	getMenuContainer()?.classList.remove('opened');
}

function openPreview() {
	getPreviewContainer()?.classList.add('opened');
}

function closePreview() {
	getPreviewContainer()?.classList.remove('opened');
}

export function setPreview(src: string) {
	const img = document.createElement('img');
	img.src = src;
	getPreview()!.innerHTML = '';
	getPreview()?.appendChild(img);
}

// Initialize

document.addEventListener('keyup', (event) => {
	if (event.which === 77) {
		openMenu();
	}
});

getMenuCloseButton()?.addEventListener('click', closeMenu);

getShareButton()?.addEventListener('click', async () => {
	const media = await getScreenMedia();
	document.body.classList.add('sharing');
	media.getVideoTracks()[0]?.addEventListener('ended', () => {
		document.body.classList.remove('sharing');
	});
});

getSnapshotButton()?.addEventListener('click', async () => {
	closeMenu();
	const media = await getScreenMedia();
	const image = await getScreenshot();
	setPreview(image);
	openPreview();
});

getPreviewCloseButton()?.addEventListener('click', closePreview);

getOpenPreviewButton()?.addEventListener('click', () => {
	closeMenu();
	openPreview();
});

getConnectButton()?.addEventListener('click', async () => {
	const socket = await connect();
	document.body.classList.add('connected');
	socket.addEventListener('close', () => {
		document.body.classList.remove('connected');
	});
});

getDisconnectButton()?.addEventListener('click', () => {
	disconnect();
});
