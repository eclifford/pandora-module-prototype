const roles = {};

export const ERRORS = Object.freeze({
  NO_ROLE_REGISTERED: 'NO_ROLE_REGISTERED'
});

export function registerRole(role, cb) {
  if (roles[role]) {
    throw new Error(`Cannot register role "${role}" because that role has already been registered`);
  }
  roles[role] = cb;
}

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
