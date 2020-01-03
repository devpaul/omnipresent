import { defaultTimeout } from "src/config";

export function rejectAfter<T extends any>(timeout: number): Promise<T> {
	return new Promise((_, reject) => {
		setTimeout(reject, timeout);
	});
}

export function timeout<T>(promise: Promise<T>, timeout: number = defaultTimeout): Promise<T> {
	return Promise.race([promise, rejectAfter<T>(timeout)]);
}
