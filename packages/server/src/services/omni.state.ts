interface AuthenticatedUser {
	roles: Set<string>
}

const roleMap = new Map<string, Set<string>>();
const authenticated = new Map<string, AuthenticatedUser>();

function guaranteeRoleAuthed(role: string) {
	if (!roleMap.has(role)) {
		roleMap.set(role, new Set());
	}
	return roleMap.get(role)!;
}

function guaranteeUserMeta(id: string) {
	const meta = authenticated.get(id) || { roles: new Set() };
	authenticated.set(id, meta);
	return meta;
}

export function listRoles() {
	return Array.from(roleMap.keys());
}

export function getAutheticated(id: string) {
	return authenticated.get(id);
}

export function isAuthenticated(id: string) {
	return authenticated.has(id);
}

export function addAuthenticated(id: string, role: string) {
	guaranteeRoleAuthed(role).add(id);
	guaranteeUserMeta(id).roles.add(role);

	const meta = authenticated.get(id) || { roles: new Set() };
	authenticated.set(id, meta);
	meta.roles.add(role);
}

export function userLeft(id: string) {
	const user = authenticated.get(id);
	authenticated.delete(id);

	const result = {
		authenticated: Boolean(user),
		removedRoles: [] as string[]
	};

	if (user) {
		for (let role in user.roles) {
			roleMap.get(role)?.delete(id);
			if (!roleMap.get(role)?.size) {
				roleMap.delete(role);
				result.removedRoles.push(role);
			}
		}
	}

	return result;
}
