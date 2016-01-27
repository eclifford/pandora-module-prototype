const roles = {};

export const ROLES = Object.freeze({
  BROADCAST: '*',
  LOGGER: 'LOGGER',
  AUTHENTICATOR: 'AUTHENTICATOR',
  PLAYER: 'PLAYER',
  COORDINATOR: 'COORDINATOR',
  UI: 'UI'
});

// Basically flux actions
export const MESSAGE_TYPES = Object.freeze({
  REQUEST_LOGIN: 'REQUEST_LOGIN',
  LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOG_MESSAGE: 'LOG_MESSAGE'
});

/**
 * Registers a role. There can only be one module registered for a role per
 * application. To register a module for a role that already has a registered
 * module, the first module must be unregistered first.
 *
 * @example
 * registerRole(ROLES.AUTH, (request, cb) => {
 *   // Do stuff with request
 *   const myResponse = {
 *     name: 'Fry',
 *     occupation: 'Delivery boy'
 *   };
 *   cb(null, myResponse);
 * });
 * @example
 * registerRole(ROLES.AUTH, (request, cb) => {
 *   // Do stuff with request
 *   const myError = {
 *     message: 'Bender isn\'t the calculating type of robot'
 *   };
 *   cb(myError);
 * });
 */
export function registerRole(role, cb) {
  if (!ROLES.hasOwnProperty(role)) {
    throw new Error(`Cannot register unknown role "${role}"`);
  }
  if (roles[role]) {
    throw new Error(`Cannot register role "${role}" because that role has already been registered`);
  }
  roles[role] = cb;
}

/**
 * Unregisters the module registered for the given role. This allows another
 * module to be registered for this role
 *
 * @example
 * unregisterRole(ROLES.AUTH);
 */
export function unregisterRole(role) {
  delete roles[role];
}

/**
 * Sends a message to the supplied role. The callback is called with the response
 * to the message.
 *
 * Messages can be sent to all supplied roles, by specifying ROLES.BROADCAST as
 * the recipient. In this case, the callback is called with results from all
 * registered roles.
 *
 * If a message is sent to a role that doesn't exist, the callback is still
 * called, but with an error message that's basically an equivalent to a 404
 *
 * @example
 * send(ROLES.AUTH, {
 *   action: 'login',
 *   username: 'Leela',
 *   password: 'alianese'
 * }, (err, response) => {
 *   if (err) {
 *     console.log('Error logging in Leela');
 *     return;
 *   }
 *   console.log('Leela logged in!');
 * });
 */
export function send(destination, message, cb = () => {}) {
  if (!MESSAGE_TYPES[message.type]) {
    throw new Error(`Invalid message type ${message.type}`);
  }
  if (destination === '*') {
    let numRoles = Object.keys(destination).length;
    const results = {};
    for (const role in roles) {
      roles[role](message, (error, response) => {
        results[role] = {
          error,
          response
        };
        numRoles--;
        if (!numRoles) {
          // Put on the next tick to make it async
          // see https://nodejs.org/dist/latest-v5.x/docs/api/process.html#process_process_nexttick_callback_arg for background
          setTimeout(() => cb(results));
        }
      });
    }
  } else if (roles[destination]) {
    roles[destination](message, (...args) => setTimeout(() => cb(...args)));
  } else {
    throw new Error(`Cannot send message to "${destination}" because no one registered for that role`);
  }
}
