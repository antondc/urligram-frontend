import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Location } from 'history';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Routes from 'Routes/routes';
import Login from '../Login';
import Home from '../Home';
import Control from '../Control';
import NotFound from '../NotFound';

import './Main.less';

interface Props {
  isLogged: boolean;
  location: Location;
}

const Main: React.FC<Props> = ({ isLogged, location, location: { pathname } }) => (
  <div className="Main">
    <TransitionGroup component={null}>
      <CSSTransition
        // Important for Link component
        key={pathname}
        appear={true}
        classNames="Main"
        timeout={{
          enter: 150,
          exit: 150,
        }}
        onExited={() => {
          window.scrollTo({
            top: 0,
          });
        }}
      >
        <section className="Main-initial">
          {/* Location needed for animations */}
          <Switch location={location}>
            {isLogged && <Redirect from="/:lang?/login" to="/control" />}
            {!isLogged && <Redirect from="/:lang?/control" to="/login" />}
            <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />;
            <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
            <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
            <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  </div>
);

const mapStateToProps = (state) => ({
  isLogged: !!state.User.id,
});

export default connect(mapStateToProps)(Main);
