import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { logIn } from 'Modules/Session/actions/logIn';
import { Button, H3, Hr } from '@antoniodcorrea/components';

import './SignIn.less';

interface Props {
  logIn: ({ username, password }) => void;
}

interface State {
  username: string;
  password: undefined;
}

class SignIn extends Component<Props, State> {
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
    logIn({ username, password });
  };

  render() {
    return (
      <>
        <Hr spacer size="big" />
        <Hr spacer size="big" />
        <Hr spacer size="big" />
        <div className="SignIn">
          <div className="SignIn-content">
            <H3 className="SignIn-h3">SIGN IN PAGE</H3>
            <form className="SignIn-form">
              <input name="username" type="text" placeholder="Session name" autoFocus onChange={this.onChange} />
              <input name="password" type="text" placeholder="Password" autoFocus onChange={this.onChange} />
              <Button text="Enter" onClick={this.onSubmit} />
            </form>
          </div>
        </div>{' '}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  logIn,
})(SignIn);
