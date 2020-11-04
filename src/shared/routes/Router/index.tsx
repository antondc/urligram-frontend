import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route,Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import Control from 'Routes/Control';
import Home from 'Routes/Home';
import Routes from 'Routes/index';
import Login from 'Routes/Login';
import NotFound from 'Routes/NotFound';
import SignIn from 'Routes/SignIn';
import { Location } from 'Services/History';
import FadeInOut from 'Ui/FadeInOut';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
}

const Router: React.FC<Props> = ({ loggedIn, location, defaultCurrentSlug, pathWithoutLanguageParam }) => (
  <FadeInOut valueToUpdate={pathWithoutLanguageParam}>
    <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
      {loggedIn && <Redirect from="/:lang?/login" to={'/' + defaultCurrentSlug + '/control'} />}
      {!loggedIn && <Redirect from="/:lang?/control" to={'/' + defaultCurrentSlug + '/sign-in'} />}
      <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />
      <Route exact={Routes.SignIn.exact} path={Routes.SignIn.path} component={SignIn} />
      <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
      <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
      <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
    </Switch>
  </FadeInOut>
);

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  defaultCurrentSlug: selectCurrentLanguageSlug,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(Router);
