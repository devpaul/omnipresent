export function setPresenterSpace() {
	const leftPresenterHand = document.querySelector('#left');
	const rightPresenterHand = document.querySelector('#right');
	const rig = document.querySelector('#rig');
	const present = document.querySelector('#present-help');

	leftPresenterHand?.setAttribute('visible', 'false');
	rightPresenterHand?.setAttribute('visible', 'false');
	rig?.setAttribute('position', '0 1.6 0');
	rig?.setAttribute('rotation', '0 180 0');
	present?.setAttribute('visible', true);
}

export function setViewerSpace() {
	const leftPresenterHand = document.querySelector('#left');
	const rightPresenterHand = document.querySelector('#right');
	const rig = document.querySelector('#rig');

	leftPresenterHand?.setAttribute('visible', 'true');
	rightPresenterHand?.setAttribute('visible', 'true');
	rig?.setAttribute('position', '0 1.6 8');
	rig?.setAttribute('rotation', '0 0 0');
}
