import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import About from 'Pages/About';
import ConfirmSignUp from 'Pages/ConfirmSignUp';
import Control from 'Pages/Control';
import Login from 'Pages/Login';
import NotFound from 'Pages/NotFound';
import ServerError from 'Pages/ServerError';
import SignUp from 'Pages/SignUp';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';

import './FullPage.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
}

const FullPage: React.FC<Props> = ({ loggedIn, location, defaultCurrentSlug, pathWithoutLanguageParam }) => (
  <div className="FullPage">
    <FadeInOut classname="FullPage-content" valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        {/* Redirects */}
        {loggedIn && <Redirect from={Routes.ConfirmSignUp.path} to={'/' + defaultCurrentSlug + '/'} />}
        {loggedIn && <Redirect from={Routes.SignUp.path} to={'/' + defaultCurrentSlug + '/'} />}
        {loggedIn && <Redirect from={Routes.Login.path} to={'/' + defaultCurrentSlug + '/'} />}
        {!loggedIn && <Redirect from={Routes.Control.path} to={'/' + defaultCurrentSlug + '/login'} />}

        {/* General */}
        <Route exact={Routes.About.exact} path={Routes.About.path} component={About} />
        <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
        <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />
        <Route exact={Routes.SignUp.exact} path={Routes.SignUp.path} component={SignUp} />
        <Route exact={Routes.ConfirmSignUp.exact} path={Routes.ConfirmSignUp.path} component={ConfirmSignUp} />

        {/* Guards */}
        <Route exact={Routes.ServerError.exact} path={Routes.ServerError.path} component={ServerError} />
        <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
      </Switch>
    </FadeInOut>
  </div>
);

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  defaultCurrentSlug: selectCurrentLanguageSlug,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(FullPage);
