import { send, registerRole, unregisterRole, ROLES, MESSAGE_TYPES } from '@pandora/messaging';
import Form from './views/form.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

export function start() {
  send(ROLES.LOGGER, {
    type: MESSAGE_TYPES.LOG_MESSAGE,
    message: '[UI-Login] Starting UI login role',
    level: 'info'
  });
  registerRole(ROLES.UI, handleMessage);
  render();
}

export function stop() {
  unregisterRole(ROLES.UI);
}

function handleMessage(message, cb) {
  cb(null, {
    message: 'Hi from ui login'
  });
}

function render() {
  ReactDOM.render(
    <Form />,
    document.getElementById('content')
  );
}
