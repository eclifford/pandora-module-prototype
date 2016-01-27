import { send, registerRole, unregisterRole, ROLES, MESSAGE_TYPES } from '@pandora/messaging';

export function start() {
  send(ROLES.LOGGER, {
    type: MESSAGE_TYPES.LOG_MESSAGE,
    message: '[Player] Starting player role',
    level: 'info'
  });
  registerRole(ROLES.PLAYER, handleMessage);
}

export function stop() {
  unregisterRole(ROLES.PLAYER);
}

function handleMessage(message, cb) {
  cb(null, {
    message: 'Hi from player'
  });
}
