export function snackbar(message: string, timeout: number = 3000) {
	const textNode = document.querySelector('a-text');
	textNode?.setAttribute('value', message);
	setTimeout(() => {
		const currentValue = textNode?.getAttribute('value');
		if (currentValue === message) {
			textNode?.removeAttribute('value');
		}
	}, timeout);
}

export function displayText(message?: string) {
	const textNode = document.querySelector('a-text');
	textNode?.setAttribute('value', message);
}
