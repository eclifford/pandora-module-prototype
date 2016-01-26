const roles = {};

export const ERRORS = Object.freeze({
  NO_ROLE_REGISTERED: 'NO_ROLE_REGISTERED', // 404
  ROLE_SPECIFIC: 'ROLE_SPECIFIC' // 500?
});

/**
 * Registers a role. There can only be one module registered for a role per
 * application. To register a module for a role that already has a registered
 * module, the first module must be unregistered first.
 *
 * @example
 * registerRole('auth', (request, cb) => {
 *   // Do stuff with request
 *   const myResponse = {
 *     name: 'Fry',
 *     occupation: 'Delivery boy'
 *   };
 *   cb(null, myResponse);
 * });
 * @example
 * registerRole('auth', (request, cb) => {
 *   // Do stuff with request
 *   const myError = {
 *     code: ERRORS.ROLE_SPECIFIC,
 *     message: 'Bender isn\'t the calculating type of robot'
 *   };
 *   cb(myError);
 * });
 */
export function registerRole(role, cb) {
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
 * unregisterRole('auth');
 */
export function unregisterRole(role) {
  delete roles[role];
}

/**
 * Sends a message to the supplied role. The callback is called with the response
 * to the message.
 *
 * Messages can be sent to all supplied roles, by specifying '*' as the
 * recipient. In this case, the callback is called with results from all
 * registered roles.
 *
 * If a message is sent to a role that doesn't exist, the callback is still
 * called, but with an error message that's basically an equivalent to a 404
 *
 * @example
 * send('auth', {
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
export function send(role, message, cb) {
  if (role === '*') {
    let numRoles = Object.keys(roles).length;
    const results = {};
    for (const role in roles) {
      roles[role](message, (err, res) => {
        results[role] = {
          err,
          res
        };
        numRoles--;
        if (!numRoles) {
          cb(results);
        }
      });
    }
  } else if (roles[role]) {
    roles[role](message, cb);
  } else {
    setTimeout(() => cb({
      code: ERRORS.NO_ROLE_REGISTERED,
      message: `Cannot send message to ${role} because no one registered for that role`
    }));
  }
}
