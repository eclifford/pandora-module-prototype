import { send, ROLES, MESSAGE_TYPES } from '@pandora/messaging';

export function createLoginAction(username, password) {
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
