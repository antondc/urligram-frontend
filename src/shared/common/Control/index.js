import React from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import decode from 'jwt-decode';

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  isLogged = () => {
    const { cookies } = this.props;
    const token = cookies.get('sessionToken');
    try {
      const decodedToken = decode(token);
      const tokenDecodesAndIsNotExpired = !!decodedToken && !this.isCookieExpired(token);
      this.setState({
        isLogged: tokenDecodesAndIsNotExpired,
      });
      return tokenDecodesAndNotExpired;
    } catch (err) {
      return false;
    }
  };

  isCookieExpired = token => {
    try {
      if (decode(token).exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  componentWillMount = () => {
    const { auth, logOut } = this.props;
    const { isLogged } = this.state;

    if (auth && !isLogged && isBrowser) {
      logOut();
    }
  };

  render = () => {
    const { children } = this.props;
    return children;
  };
}

export default withCookies(
  connect(null, {
    logOut: actions.logOut,
  })(Control)
);
