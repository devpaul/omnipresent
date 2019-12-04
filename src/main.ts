import { castMedia, getScreenMedia } from './capture/screen';
import { report } from './compatability';

let screenMedia: MediaStream;

const showScreenButton = document.getElementById('share-screen');
showScreenButton!.addEventListener('click', async () => {
	screenMedia = await getScreenMedia();
	const videoEl = document.getElementById('vrscreen') as HTMLVideoElement;
	castMedia(screenMedia, videoEl);
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

const compatReportButton = document.getElementById('toggle-compat');
compatReportButton!.addEventListener('click', () => {
	const currentReport = document.getElementById('console')!;
	if (currentReport.children.length) {
		for (let child of Array.from(currentReport.children)) {
			child.parentNode!.removeChild(child);
		}
		return;
	}
	const ulNode = document.createElement('ul');
	for (let [name, result] of Object.entries(report())) {
		const liNode = document.createElement('li');
		liNode.innerHTML = `${name}: ${result}`;
		ulNode.appendChild(liNode);
	}
	currentReport.appendChild(ulNode);
})
