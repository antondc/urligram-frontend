import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from 'Modules/User/actions/logIn';
import { Button } from '@antoniodcorrea/components';

import './Login.less';

interface Props {
  isLogged: boolean;
  logIn: (username: string, password: string) => void;
}
interface State {
  username: string;
  password: undefined;
}

class Login extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as Pick<State, keyof State>);
  };

  onSubmit = () => {
    const { logIn } = this.props;
    const { username, password } = this.state;
    logIn(username, password);
  };

  render() {
    return (
      <div className="Login">
        <h1 className="Login-h1">LOGIN PAGE</h1>
        <form className="Login-form">
          Sign in
          <input name="username" type="text" placeholder="User name" autoFocus onChange={this.onChange} />
          <input name="password" type="text" placeholder="Password" autoFocus onChange={this.onChange} />
          <Button text="Enter" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.User.isLogged,
});

export default connect(mapStateToProps, {
  logIn: logIn,
})(Login);
