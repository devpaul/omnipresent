import { stopSharing, getScreenMedia, getScreenshot } from 'present-core/webrtc/screen';
import { uploadImage } from 'present-core/api/upload';
import { createProcess, createCommandFactory } from '@dojo/framework/stores/process';
import { State } from '../interfaces';
import { replace } from '@dojo/framework/stores/state/operations';

const commandFactory = createCommandFactory<State>();

const shareScreenCommand = commandFactory(async ({ path }) => {
	await getScreenMedia();

	return [
		replace(path('isSharing'), true)
	];
});

const stopSharingScreenCommand = commandFactory(async ({ path }) => {
	await stopSharing();

	return [
		replace(path('isSharing'), false)
	];
});

const snapshotCommand = commandFactory(async ({ get, path }) => {
	const dataUrl = await getScreenshot();
	uploadImage(dataUrl, {
		name: 'image',
		type: 'png'
	});
});

export const shareScreenProcess = createProcess('share-screen', [shareScreenCommand]);
export const stopSharingScreenProcess = createProcess('stop-sharing-screen', [stopSharingScreenCommand]);
export const snapshotProcess = createProcess('snapshot', [snapshotCommand]);
