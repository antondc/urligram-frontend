import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Routes from '../../routes/routes';
import './Main.less';

class MainUi extends React.Component {
  render() {
    return (
      <div className="Main">
        <section className="Main-initial">
          <Switch location={this.props.location}>
            <Route
              exact={Routes.Control.exact}
              path={Routes.Control.path}
              render={props => {
                return <Routes.Control.component {...props} {...Routes.Control} />;
              }}
            />
            <Route
              exact={Routes.Login.exact}
              path={Routes.Login.path}
              render={props => {
                return <Routes.Login.component {...props} {...Routes.Login} />;
              }}
            />
            <Route
              exact={Routes.Home.exact}
              path={Routes.Home.path}
              render={props => {
                return <Routes.Home.component {...props} {...Routes.Home} />;
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

export default withCookies(MainUi);
