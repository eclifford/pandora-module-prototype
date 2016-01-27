import { send, registerRole, unregisterRole, ROLES, MESSAGE_TYPES } from '@pandora/messaging';

export function start() {
  send(ROLES.LOGGER, {
    type: MESSAGE_TYPES.LOG_MESSAGE,
    message: '[Authenticator] Starting authenticator role',
    level: 'info'
  });
  registerRole(ROLES.AUTHENTICATOR, handleMessage);
}

export function stop() {
  unregisterRole(ROLES.AUTHENTICATOR);
}

function handleMessage(message, cb) {
  switch(message.type) {
    case MESSAGE_TYPES.REQUEST_LOGIN:
      debugger;
      if (message.username === 'fry' && message.password === 'seymour') {
        cb(null, 'ok');
      } else {
        cb('Invalid username or password');
      }
      break;
    default:
      break;
  }
}
