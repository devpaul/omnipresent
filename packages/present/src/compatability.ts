export function checkScreenSharing() {
	return !!navigator.mediaDevices.getDisplayMedia;
}

const checks: { [ key: string ]: boolean | (() => boolean) } = {
	screenSharing: checkScreenSharing
}

export function has(name: keyof typeof checks) {
	const check = checks[name];
	return typeof check === 'function' ? check() : check;
}

export function report(): { [ key: string ]: boolean } {
	return Object.keys(checks).reduce((result: { [ key: string ]: boolean }, key) => {
		result[key] = has(key);
		return result;
	}, {});
}
