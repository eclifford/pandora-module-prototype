import { registerRole, unregisterRole, ROLES, MESSAGE_TYPES } from '@pandora/messaging';

export function start() {
  log('info', '[Logger] Starting logger role');
  registerRole(ROLES.LOGGER, handleMessage);
}

export function stop() {
  unregisterRole(ROLES.LOGGER);
}

function handleMessage(message, cb) {
  switch(message.type) {
    case MESSAGE_TYPES.LOG_MESSAGE:
      log(message.level, message.message);
      cb();
      break;
    default:
      break;
  }
}

function log(level, message) {
  if (!console[level]) {
    throw new Error(`Invalid log level "${level}"`);
  }
  console[level](`${new Date()}: ${message}`);
}