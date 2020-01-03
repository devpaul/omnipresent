export interface Handler {
	addEventListener(name: string, handler: () => any): void;
	removeEventListener(name: string, handler: () => any): void;
}

export function once(target: Element, name: string, handler: () => void) {
	const wrapper = () => {
		handler();
		target.removeEventListener(name, wrapper);
	}
	target.addEventListener(name, wrapper);
}
