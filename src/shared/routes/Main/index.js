import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Routes from '../../routes/routes';

import './Main.less';

class Main extends React.Component {
  render() {
    const { isLogged, location } = this.props;

    return (
      <div className="Main">
        <section className="Main-initial">
          <Switch location={location}>
            {isLogged && <Redirect from="/:lang?/login" to="/control" />}
            {!isLogged && <Redirect from="/:lang?/control" to="/login" />}
            <Route path={Routes.Login.path} exact={Routes.Login.exact}>
              <Route
                exact={Routes.Login.exact}
                path={Routes.Login.path}
                render={props => {
                  return <Routes.Login.component {...props} {...Routes.Login} />;
                }}
              />
            </Route>
            <Route
              exact={Routes.Home.exact}
              path={Routes.Home.path}
              render={props => {
                return <Routes.Home.component {...props} {...Routes.Home} />;
              }}
            />
            <Route
              exact={Routes.Control.exact}
              path={Routes.Control.path}
              render={props => {
                return <Routes.Control.component {...props} {...Routes.Control} />;
              }}
            />

            <Route
              exact={Routes.NotFound.exact}
              path={Routes.NotFound.path}
              render={props => {
                return <Routes.NotFound.component {...props} {...Routes.NotFound} />;
              }}
            />
          </Switch>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: !!state.UserSession.id,
});

export default connect(mapStateToProps)(Main);
