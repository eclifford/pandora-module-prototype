import { send, registerRole, unregisterRole, ROLES, MESSAGE_TYPES } from '@pandora/messaging';

export function start() {
  send(ROLES.LOGGER, {
    type: MESSAGE_TYPES.LOG_MESSAGE,
    message: '[UI-Player] Starting UI player role',
    level: 'info'
  });
  registerRole(ROLES.UI, handleMessage);
}

export function stop() {
  unregisterRole(ROLES.UI);
}

function handleMessage(message, cb) {
  cb(null, {
    message: 'Hi from ui player'
  });
}
