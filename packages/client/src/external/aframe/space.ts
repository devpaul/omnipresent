export function setPresenterSpace() {
	const leftPresenterHand = document.querySelector('#left');
	const rightPresenterHand = document.querySelector('#right');
	const camera = document.querySelector('[camera]');

	leftPresenterHand?.setAttribute('visible', 'false');
	rightPresenterHand?.setAttribute('visible', 'false');
	camera?.setAttribute('position', '0 1.6 0');
}

export function setViewerSpace() {

}
