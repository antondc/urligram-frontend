import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import WithAuth from '../../common/WithAuth/WithAuth';
import { withRouter } from 'react-router';

import './Login.less';

class LoginUi extends Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      password: undefined,
    };
  }

  componentWillMount() {
    if (this.props.logged) {
      this.props.history.replace('/control');
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = () => {
    const { username, password } = this.state;
    this.props.requestToken(username, password, this.props.history);
  };

  render() {
    return (
      <div className="Login">
        <h1 className="NotFound-h1">LOGIN PAGE</h1>
        <form onSubmit={this.onSubmit}>
          Sign in
          <input name="username" type="text" label="User name" autoFocus onChange={this.onChange} />
          <input name="password" type="text" label="Password" autoFocus onChange={this.onChange} />
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default withCookies(WithAuth(withRouter(LoginUi)));
