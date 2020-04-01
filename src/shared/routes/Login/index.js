import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from '../../redux/actions';

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
    const { isLogged, history } = this.props;
    if (isLogged) {
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

const mapStateToProps = state => ({
  isLogged: state.UserSession.isLogged,
});

export default withRouter(
  connect(mapStateToProps, {
    requestToken: actions.requestToken,
  })(LoginUi)
);
