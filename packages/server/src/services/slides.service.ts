import { FileServiceProperties } from 'webserv/src/core/services/file.service';
import { Service } from 'webserv';
import { noCache } from 'webserv/src/core/processors/cache.processor';
import { method } from 'webserv/src/core/guards/method';
import { serve } from 'webserv/src/core/middleware/serve';
import { Guard } from 'webserv/src/core/interface';
import { existsSync } from 'fs';
import { resolve, join } from 'path';
import { parse as parseUrl } from 'url';

function fileExistsGuard(basePath: string): Guard {
	return (request) => {
		if (request.url) {
			const url: string = request.url;
			const base = resolve(basePath);
			const target = join(base, decodeURI(parseUrl(url).pathname || ''));
			console.log('sfssf', target);
			return existsSync(target);
		}

		return false;

	}
}

export function slideService(): Service {
	return {
		route: {
			before: [noCache],
			guards: [method.get('/files/*')],
			middleware: [
				{
					guards: [fileExistsGuard('./uploads')],
					middleware: serve({
						basePath: './uploads'
					})
				},
				{
					middleware: serve({
						basePath: './fallback'
					})
				}
			]
		}
	};
}
