import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
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
    const {
      UserSession: { logged },
      history,
    } = this.props;
    if (logged) {
      history.replace('/control');
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = () => {
    const { requestToken } = this.props;
    const { username, password } = this.state;
    requestToken(username, password, this.props.history);
  };

  render() {
    return (
      <div className="Login">
        <h1 className="NotFound-h1">LOGIN PAGE</h1>
        <form>
          Sign in
          <input name="username" type="text" label="User name" autoFocus onChange={this.onChange} />
          <input name="password" type="text" label="Password" autoFocus onChange={this.onChange} />
          <button type="button" onClick={this.onSubmit}>
            Enter
          </button>
        </form>
      </div>
    );
  }
}

export default withCookies(withRouter(LoginUi));
