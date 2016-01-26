import { ROLES, registerRole, send } from '@pandora/messaging';
import { messageHandler as authMessageHandler } from '@pandora/auth';
// import '@pandora/logger';
// import '@pandora/player';
// import '@pandora/ui-login';
// import '@pandora/ui-player';

registerRole(ROLES.AUTH, authMessageHandler);

send(ROLES.AUTH, {}, (err, response) => {
  console.log(err, response.message);
});
