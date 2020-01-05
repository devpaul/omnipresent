import { Action, createHandler, createRequest, Response } from './api';

export interface StatusPayload {
	roles: string[];
	connectionCount: number;
}

export interface RolePayload {
	role: string;
}

export const getStatus = createRequest(Action.GetStatus);
export const handleStatus = createHandler<StatusPayload>(Response.Status);

export const handleRoleConnected = createHandler<RolePayload>(Action.RoleConnected);
export const handleRoleLeft = createHandler<RolePayload>(Action.RoleLeft);
