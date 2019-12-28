import { Position } from '../interfaces';

export function positionToString(pos: Position) {
	return `${pos.x} ${pos.y} ${pos.z}`;
}
