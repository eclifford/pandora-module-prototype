import { send, ROLES, MESSAGE_TYPES } from '@pandora/messaging';

export const ACTIONS = Object.freeze({
  REQUEST_LOGIN: 'REQUEST_LOGIN'
});

export function createRequestLoginAction(username, password) {
  send(ROLES.AUTHENTICATOR, {
    type: MESSAGE_TYPES.REQUEST_LOGIN,
    username,
    password
  }, (err, result) => {
    if (err) {
      console.error(`Error logging in: ${err}`);
      return;
    }
    console.log('Logged in successfully');
  });
}
