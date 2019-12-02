export function checkScreenSharing() {
	return !!navigator.mediaDevices.getDisplayMedia;
}

export const check = () => {
	return Object.keys(check).every((key) => {
		const value: any = (check as any)[key];
		if (typeof value === 'function') {
			return value();
		}
		return value;
	})
};
Object.defineProperties(check, {
	'screenSharing': {
		get: checkScreenSharing
	}
});

export default check;
