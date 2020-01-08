import { Action, createHandler, createRequest, Response } from './api';
import { Media } from './screen';
import { SlideChangedPayload } from './revealjs';

export interface StatusPayload {
	roles: string[];
	connectionCount: number;
	screen: {
		media: Media
	},
	slide: SlideChangedPayload
}

export interface RolePayload {
	role: string;
}

export const getStatus = createRequest(Action.GetStatus);
export const handleStatus = createHandler<StatusPayload>(Response.Status);

export const handleRoleConnected = createHandler<RolePayload>(Action.RoleConnected);
export const handleRoleLeft = createHandler<RolePayload>(Action.RoleLeft);
