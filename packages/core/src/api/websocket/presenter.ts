import { createRequest, Action, createHandler } from "./api";

export interface Pose {
	pos: { x: number, y: number, z: number };
	rot: { x: number, y: number, z: number };
}

export interface CharacterPose {
	[ key: string ]: Pose;
}

export const sharePose = createRequest<CharacterPose>(Action.Pose);
export const handlePose = createHandler<CharacterPose>(Action.Pose);
