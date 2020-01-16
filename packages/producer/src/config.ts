import {getSlideName} from 'present-core/api/upload'
import { SlideIndex } from 'present-core/api/websocket/revealjs';

export function getSlideUrl(slide: SlideIndex, deck: string, type: string = 'png') {
	return `/files/${getSlideName(slide, deck, type)}`;
}

export const DECKNAME = 'slide';
export const IMAGETYPE = 'png';
