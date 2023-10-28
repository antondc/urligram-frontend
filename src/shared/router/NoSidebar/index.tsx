import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CookiesBanner from 'Components/CookiesBanner';
import Footer from 'Components/Footer';
import HeaderNew from 'Components/HeaderNew';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import ForgotPassword from 'Pages/ForgotPassword';
import Login from 'Pages/Login';
import NotFound from 'Pages/NotFound';
import ResetPassword from 'Pages/ResetPassword';
import ServerError from 'Pages/ServerError';
import SignUp from 'Pages/SignUp';
import SignUpConfirmation from 'Pages/SignUpConfirmation';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';

import './NoSidebar.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
}

const NoSidebar: React.FC<Props> = ({ loggedIn, location, defaultCurrentSlug, pathWithoutLanguageParam }) => (
  <div className="NoSidebar">
    <div className="NoSidebar-noSidebarBackground" />
    <HeaderNew />
    <CookiesBanner />

    <div className="NoSidebar-content">
      <FadeInOut className="NoSidebar-content-content" valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear>
        <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
          {/* Redirects */}
          {/* {loggedIn && <Redirect from={Routes.SignUpConfirmation.path} to={'/' + defaultCurrentSlug + '/'} />} */}
          {loggedIn && <Redirect from={Routes.SignUp.path} to={'/' + defaultCurrentSlug + '/'} />}
          {loggedIn && <Redirect from={Routes.Login.path} to={'/' + defaultCurrentSlug + '/'} />}
          {!loggedIn && <Redirect from={Routes.Link.path} to={Routes.Home.route} />}

          {/* General */}
          <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />
          <Route exact={Routes.SignUp.exact} path={Routes.SignUp.path} component={SignUp} />
          <Route exact={Routes.ForgotPassword.exact} path={Routes.ForgotPassword.path} component={ForgotPassword} />
          <Route exact={Routes.ResetPassword.exact} path={Routes.ResetPassword.path} component={ResetPassword} />
          <Route
            exact={Routes.SignUpConfirmation.exact}
            path={Routes.SignUpConfirmation.path}
            component={SignUpConfirmation}
          />
          {/* Guards */}
          <Route exact={Routes.ServerError.exact} path={Routes.ServerError.path} component={ServerError} />
          <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
        </Switch>
      </FadeInOut>
    </div>
    <Footer />
  </div>
);

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  defaultCurrentSlug: selectCurrentLanguageSlug,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(NoSidebar);
