import { ROLES, registerRole, send } from '@pandora/messaging';
import { messageHandler as authMessageHandler } from '@pandora/auth';
import { messageHandler as loggerMessageHandler } from '@pandora/logger';
import { messageHandler as playerMessageHandler } from '@pandora/player';
import { messageHandler as uiLoginMessageHandler } from '@pandora/ui-login';
import { messageHandler as uiPlayerMessageHandler } from '@pandora/ui-player';

registerRole(ROLES.AUTH, authMessageHandler);
registerRole(ROLES.LOGGER, loggerMessageHandler);
registerRole(ROLES.PLAYER, playerMessageHandler);
registerRole(ROLES.UI, uiLoginMessageHandler);

// This serves as coordinator for the system
registerRole(ROLES.COORDINATOR, (request, cb) => {
  // Wait for logged in success message, then swap UI roles
  cb(null, {
    message: 'Hi from the coordinator'
  });
});

// Kick start the system
send(ROLES.BROADCAST, {}, (err, response) => {
  console.log(err, response);
});
