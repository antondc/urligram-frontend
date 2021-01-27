import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import BookmarksUser from 'Routes/BookmarksUser';
import BookmarksVisitor from 'Routes/BookmarksVisitor';
import Control from 'Routes/Control';
import HomeUser from 'Routes/HomeUser';
import HomeVisitor from 'Routes/HomeVisitor';
import Routes from 'Routes/index';
import LinksUser from 'Routes/LinksUser';
import LinksVisitor from 'Routes/LinksVisitor';
import Lists from 'Routes/Lists';
import Login from 'Routes/Login';
import NotFound from 'Routes/NotFound';
import SignIn from 'Routes/SignIn';
import User from 'Routes/User';
import Users from 'Routes/Users';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
}

const Router: React.FC<Props> = ({ loggedIn, location, defaultCurrentSlug, pathWithoutLanguageParam }) => (
  <FadeInOut valueToUpdate={pathWithoutLanguageParam} appear>
    <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
      {loggedIn && <Redirect from="/:lang?/login" to={'/' + defaultCurrentSlug + '/control'} />}
      {!loggedIn && <Redirect from="/:lang?/control" to={'/' + defaultCurrentSlug + '/sign-in'} />}
      <Route exact={Routes.User.exact} path={Routes.User.path} component={User} />
      <Route exact={Routes.Users.exact} path={Routes.Users.path} component={Users} />
      {loggedIn && <Route exact={Routes.LinksUser.exact} path={Routes.LinksUser.path} component={LinksUser} />}
      <Route exact={Routes.LinksVisitor.exact} path={Routes.LinksVisitor.path} component={LinksVisitor} />
      <Route exact={Routes.Lists.exact} path={Routes.Lists.path} component={Lists} />
      {loggedIn && (
        <Route exact={Routes.BookmarksUser.exact} path={Routes.BookmarksUser.path} component={BookmarksUser} />
      )}
      <Route exact={Routes.BookmarksVisitor.exact} path={Routes.BookmarksVisitor.path} component={BookmarksVisitor} />
      <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />
      <Route exact={Routes.SignIn.exact} path={Routes.SignIn.path} component={SignIn} />
      {loggedIn && <Route exact={Routes.HomeUser.exact} path={Routes.HomeUser.path} component={HomeUser} />}
      <Route exact={Routes.HomeVisitor.exact} path={Routes.HomeVisitor.path} component={HomeVisitor} />
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
