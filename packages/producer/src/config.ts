import {getSlideName} from 'present-core/api/upload'

export function getSlideUrl(deck: string, h: number, v: number, type: string = 'png') {
	return `/files/${getSlideName(deck, h, v, type)}`;
}

export const DECKNAME = 'slide';
export const IMAGETYPE = 'png';
