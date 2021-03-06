import { announce, commandService } from '../../realtime/command.service';
import { Action } from './Actions';
import { authenticatedWrapper, authenticateHandler } from './middleware/authentication';
import { cacheResponse } from './middleware/cacheResponse';
import { echo, echoAll, echoAuthenticated } from './middleware/echo';
import { getStatus } from './middleware/getStatus';
import { userLeft } from './omni.state';
import { saveFactory } from './middleware/save';

const save = saveFactory(`./recordings/${ Date.now() }.txt`);
const authenticatedEcho = authenticatedWrapper(echo);
const showMedia = authenticatedWrapper(save(cacheResponse(echoAll)));
const slideChanged = authenticatedWrapper(save(cacheResponse(echo)));
const poseHandler = authenticatedWrapper(save(echo));

export const omni = commandService({
	commands: [
		{ action: Action.Authenticate, handler: authenticateHandler },
		{ action: Action.GetStatus, handler: getStatus },
		{ action: Action.HideLaser, handler: authenticatedEcho },
		{ action: Action.NextSlide, handler: authenticatedEcho },
		{ action: Action.Pose, handler: poseHandler },
		{ action: Action.PreviousSlide, handler: authenticatedEcho },
		{ action: Action.ShowMedia, handler: showMedia },
		{ action: Action.ShowLaser, handler: authenticatedEcho },
		{ action: Action.SlideChanged, handler: slideChanged },
		{ action: Action.Notes, handler: authenticatedWrapper(echoAuthenticated) }
	],
	defaultHandler: echo,
	onDisconnect(con, {getAll}) {
		const result = userLeft(con.id);
		if (result.authenticated) {
			for (let role of result.removedRoles) {
				announce(getAll(), {
					action: Action.RoleLeft,
					role
				});
			}
		}
	}
});
