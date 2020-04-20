import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Location } from 'history';
import Routes from 'Routes/index';
import Login from 'Routes/Login';
import Home from 'Routes/Home';
import Control from 'Routes/Control';
import NotFound from 'Routes/NotFound';
import PageTransitions from 'Common/PageTransitions';
import { selectUserLoggedIn } from '../../redux/modules/User/selectors/selectUserLoggedIn';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';

import './Router.less';

interface Props {
  userLoggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
}

const Router: React.FC<Props> = ({ userLoggedIn, location, defaultCurrentSlug }) => (
  <div className="Router">
    <PageTransitions location={location}>
      {/* Location needed for animations */}
      <Switch location={location}>
        {userLoggedIn && <Redirect from="/:lang?/login" to={'/' + defaultCurrentSlug + '/control'} />}
        {!userLoggedIn && <Redirect from="/:lang?/control" to={'/' + defaultCurrentSlug + '/login'} />}
        <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />;
        <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
        <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
        <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
      </Switch>
    </PageTransitions>
  </div>
);

const mapStateToProps = createStructuredSelector({
  userLoggedIn: selectUserLoggedIn,
  defaultCurrentSlug: selectCurrentLanguageSlug,
});

export default connect(mapStateToProps, {})(Router);
