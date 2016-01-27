import { createRequestLoginAction } from '../actions/actions.js';
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
    createRequestLoginAction(this.state.username, this.state.password);
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
