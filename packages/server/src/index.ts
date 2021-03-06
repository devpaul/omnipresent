import { bootConfig } from 'webserv/src/config';
import { setLoader } from 'webserv/src/config/services';
import { App } from 'webserv/src/core/app';
import { omni } from './services/omni/omni.service';
import { slideService } from './services/slides.service';

const app = new App();
addFilesService(app);
process.env.NODE_ENV?.toUpperCase() === 'PROD' ? startProduction(app) : startDevelopment(app);

setLoader('omnipresent', (app, config, basepath) => {
	app.addService(omni)
});

function addFilesService(app: App) {
	app.addService(slideService());
}

async function startProduction(app: App) {
	console.log('Starting in PRODUCTION mode');
	const config = await bootConfig('./webserv.json', app);

	await app.start('http', {
		port: 8888,
		...config,
	});
}

async function startDevelopment(app: App) {
	console.log('Starting in DEVELOPMENT mode');
	const config = await bootConfig('./webserv-dev.json', app);

	await app.start('http', {
		port: 8888,
		...config,
	});
}
