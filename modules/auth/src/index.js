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
  cb(null, {
    message: 'Hi from auth'
  });
}
