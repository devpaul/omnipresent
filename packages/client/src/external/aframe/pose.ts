import { Entity } from 'aframe';
import { sharePose, CharacterPose, Pose } from 'present-core/api/websocket/presenter';
import { Object3D } from 'three';

let isSharingPose: boolean = false;

function getPose(obj: Object3D) {
	return {
		pos: {
			x: obj.position.x,
			y: obj.position.y,
			z: obj.position.z,
		},
		rot: {
			x: obj.rotation.x,
			y: obj.rotation.y,
			z: obj.rotation.z,
		}
	}
}

export function startSharingPose() {
	if (isSharingPose) {
		return;
	}

	isSharingPose = true;

	const leftHand = document.getElementById('leftControl') as Entity;
	const rightHand = document.getElementById('rightControl') as Entity;

	function updatePose() {
		if (!isSharingPose) {
			return;
		}

		const data = {
			left: getPose(leftHand.object3D),
			right: getPose(rightHand.object3D)
		}

		sharePose(data);
		setTimeout(updatePose, 250);
	}

	updatePose();
}

export function stopSharingPose() {
	isSharingPose = false;
}

function setPose(obj3d: Object3D, { pos, rot }: Pose) {
	obj3d.position.set(pos.x, pos.y, pos.z);
	obj3d.rotation.set(rot.x, rot.y, rot.z);
}

export function changePose(pose: CharacterPose) {
	if (pose.left) {
		const left = document.getElementById('leftPresenter') as Entity;
		setPose(left.object3D, pose.left);
	}
	if (pose.right) {
		const right = document.getElementById('rightPresenter') as Entity;
		setPose(right.object3D, pose.right);
	}
}