import { castMedia, getScreenMedia } from './capture/screen';

let screenMedia: MediaStream;

const captureButton = document.getElementById('capture-screen');
captureButton!.addEventListener('click', async () => {
	screenMedia = await getScreenMedia();
});

const showScreenButton = document.getElementById('show-screen');
showScreenButton!.addEventListener('click', async () => {
	screenMedia = screenMedia || await getScreenMedia();
	castMedia(screenMedia);
});

const hamburgerButton = document.getElementById('hamburger');
hamburgerButton!.addEventListener('click', () => {
	const container = document.querySelector('.menu-container');
	container!.classList.add('show-menu');
});

const closeMenuButton = document.getElementById('close-menu');
closeMenuButton!.addEventListener('click', () => {
	const container = document.querySelector('.menu-container');
	container!.classList.remove('show-menu');
});
