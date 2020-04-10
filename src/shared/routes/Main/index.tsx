import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Routes from 'Routes/routes';

import './Main.less';

interface Props {
  isLogged: boolean;
}

const Main: React.FC<Props> = ({ isLogged }) => (
  <div className="Main">
    <section className="Main-initial">
      <Switch>
        {isLogged && <Redirect from="/:lang?/login" to="/control" />}
        {!isLogged && <Redirect from="/:lang?/control" to="/login" />}
        <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Routes.Login.component} />;
        <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Routes.Home.component} />
        <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Routes.Control.component} />
        <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={Routes.NotFound.component} />
      </Switch>
    </section>
  </div>
);

const mapStateToProps = (state) => ({
  isLogged: !!state.User.id,
});

export default connect(mapStateToProps)(Main);
