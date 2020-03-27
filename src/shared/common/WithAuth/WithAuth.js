import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import decode from 'jwt-decode';
import { withRouter } from 'react-router';

const WithAuth = function(AuthComponent) {
  class AuthWrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: '',
        logged: false,
      };
      this.isCookieExpired = this.isCookieExpired.bind(this);
      this.isLogged = this.isLogged.bind(this);
      this.token = this.props.cookies.get('sessionUniversalCookie');
    }

    isLogged() {
      try {
        decode(this.token);

        return !!this.token && !this.isCookieExpired(this.token); // handwaiving here
      } catch (err) {
        return false;
      }
    }

    isCookieExpired(token) {
      try {
        if (decode(token).exp < Date.now() / 1000) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }

    componentWillMount() {
      if (this.props.auth) {
        if (this.isLogged()) {
          this.setState({
            user: decode(this.token),
            logged: true,
          });
        } else {
          if (isBrowser) {
            this.props.logOut(this.props.history);
            this.props.history.replace('/login');
          }
        }
      } else if (this.isLogged()) {
        this.setState({
          user: decode(this.token),
          logged: true,
        });
      }
    }

    render() {
      return <AuthComponent {...this.props} user={this.state.user} logged={this.isLogged()} />;
    }
  }

  const connectedComponent = connect(
    (state, { match }) => {
      return {};
    },
    dispatch => {
      return {
        logOut: history => {
          dispatch(actions.logOut(history));
        },
      };
    }
  )(withCookies(withRouter(AuthWrapped)));

  return connectedComponent;
};

export default WithAuth;
