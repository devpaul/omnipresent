import { getScreenMedia } from "./screen";

function getMenuContainer() {
	return document.querySelector('.menu-container');
}

function getCloseButton() {
	return document.querySelector('.menu-container .close');
}

function getShareButton() {
	return document.querySelector('.share');
}

function openMenu() {
	getMenuContainer()?.classList.add('opened');
}

function closeMenu() {
	getMenuContainer()?.classList.remove('opened');
}

// Initialize

document.addEventListener('keyup', (event) => {
	if (event.which === 77) {
		openMenu();
	}
});

getCloseButton()?.addEventListener('click', closeMenu);

getShareButton()?.addEventListener('click', async () => {
	const media = await getScreenMedia();
});
