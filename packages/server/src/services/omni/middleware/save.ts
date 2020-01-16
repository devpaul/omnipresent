import { CommandMiddleware } from "src/realtime/command.service";
import { createWriteStream, WriteStream } from 'fs';
import { log } from 'webserv/src/core/log';

export function saveFactory(path: string) {
	let stream: WriteStream | undefined = createWriteStream(path);

	function getStream() {
		if (!stream) {
			stream = createWriteStream(path);
			watch(stream);
		}
		return stream;
	}

	function watch(s: WriteStream) {
		s.on('end', () => {
			log.warn(`[OMNI] stream "${ path }" closed`)
			stream = undefined;
		});
	}

	watch(stream);

	return (middleware: CommandMiddleware): CommandMiddleware => {
		return (data, con, methods) => {
			try {
				const payload = {
					time: Date.now(),
					data
				};
				getStream().write(JSON.stringify(payload) + '\n');
			} catch(e) {
				log.error('[OMNI] Save caught exception ', e);
			}
			middleware(data, con, methods);
		}
	}
}
