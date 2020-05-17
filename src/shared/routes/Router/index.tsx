import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Routes from 'Routes/index';
import Login from 'Routes/Login';
import Home from 'Routes/Home';
import Control from 'Routes/Control';
import NotFound from 'Routes/NotFound';
import { Location } from 'Services/History';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import FadeInOut from 'Ui/FadeInOut';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
}

const Router: React.FC<Props> = ({ loggedIn, location, defaultCurrentSlug, pathWithoutLanguageParam }) => {
  return (
    <FadeInOut valueToUpdate={pathWithoutLanguageParam}>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        {loggedIn && <Redirect from="/:lang?/login" to={'/' + defaultCurrentSlug + '/control'} />}
        {!loggedIn && <Redirect from="/:lang?/control" to={'/' + defaultCurrentSlug + '/login'} />}
        <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />;
        <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
        <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
        <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
      </Switch>
    </FadeInOut>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  defaultCurrentSlug: selectCurrentLanguageSlug,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(Router);
