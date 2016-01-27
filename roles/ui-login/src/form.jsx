import { send, ROLES, MESSAGE_TYPES } from '@pandora/messaging';
import React from 'react';

export default React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },

  onUsernameChanged(e) {
    this.setState({
      username: e.target.value
    });
  },

  onPasswordChanged(e) {
    this.setState({
      password: e.target.value
    });
  },

  loginClicked() {
    send(ROLES.AUTHENTICATOR, {
      type: MESSAGE_TYPES.REQUEST_LOGIN,
      username: this.state.username,
      password: this.state.password
    }, (err, result) => {
      console.log(err, result);
    });
  },

  render() {
    return (
      <div>
        <div>
          <span>Username:</span>
          <input type="text" onChange={this.onUsernameChanged}></input>
        </div>
        <div>
          <span>Password:</span>
          <input type="password" onChange={this.onPasswordChanged}></input>
        </div>
        <button onClick={this.loginClicked}>Login</button>
      </div>
    );
  }
});
