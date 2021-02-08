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
import FollowersUser from 'Routes/FollowersUser';
import FollowersVisitor from 'Routes/FollowersVisitor';
import FollowingUser from 'Routes/FollowingUser';
import FollowingVisitor from 'Routes/FollowingVisitor';
import HomeUser from 'Routes/HomeUser';
import HomeVisitor from 'Routes/HomeVisitor';
import Routes from 'Routes/index';
import Links from 'Routes/Links';
import ListsUser from 'Routes/ListsUser';
import ListsVisitor from 'Routes/ListsVisitor';
import ListUser from 'Routes/ListUser';
import ListVisitor from 'Routes/ListVisitor';
import Login from 'Routes/Login';
import NotFound from 'Routes/NotFound';
import ServerError from 'Routes/ServerError';
import SignIn from 'Routes/SignIn';
import TagsVisitor from 'Routes/TagsVisitor';
import User from 'Routes/User';
import UserBookmarksUser from 'Routes/UserBookmarksUser';
import UserBookmarksVisitor from 'Routes/UserBookmarksVisitor';
import UserListsUser from 'Routes/UserListsUser';
import UserListsVisitor from 'Routes/UserListsVisitor';
import UsersUser from 'Routes/UsersUser';
import UsersVisitor from 'Routes/UsersVisitor';
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
      {/* Redirects */}
      {loggedIn && <Redirect from="/:lang?/login" to={'/' + defaultCurrentSlug + '/control'} />}
      {!loggedIn && <Redirect from="/:lang?/control" to={'/' + defaultCurrentSlug + '/sign-in'} />}

      {/* Pages */}
      <Route
        exact={Routes.UserBookmarks.exact}
        path={Routes.UserBookmarks.path}
        component={loggedIn ? UserBookmarksUser : UserBookmarksVisitor}
      />
      <Route exact={Routes.User.exact} path={Routes.User.path} component={User} />
      <Route exact={Routes.Users.exact} path={Routes.Users.path} component={loggedIn ? UsersUser : UsersVisitor} />
      <Route exact={Routes.Links.exact} path={Routes.Links.path} component={Links} />
      <Route exact={Routes.List.exact} path={Routes.List.path} component={loggedIn ? ListUser : ListVisitor} />
      <Route exact={Routes.Lists.exact} path={Routes.Lists.path} component={loggedIn ? ListsUser : ListsVisitor} />
      <Route
        exact={Routes.Bookmarks.exact}
        path={Routes.Bookmarks.path}
        component={loggedIn ? BookmarksUser : BookmarksVisitor}
      />
      <Route exact={Routes.Home.exact} path={Routes.Home.path} component={loggedIn ? HomeUser : HomeVisitor} />
      <Route
        exact={Routes.Followers.exact}
        path={Routes.Followers.path}
        component={loggedIn ? FollowersUser : FollowersVisitor}
      />
      <Route
        exact={Routes.Following.exact}
        path={Routes.Following.path}
        component={loggedIn ? FollowingUser : FollowingVisitor}
      />
      <Route
        exact={Routes.UserLists.exact}
        path={Routes.UserLists.path}
        component={loggedIn ? UserListsUser : UserListsVisitor}
      />
      <Route exact={Routes.Tags.exact} path={Routes.Tags.path} component={loggedIn ? TagsVisitor : TagsVisitor} />

      {/* General */}
      <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
      <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />
      <Route exact={Routes.SignIn.exact} path={Routes.SignIn.path} component={SignIn} />

      {/* Guards */}
      <Route exact={Routes.ServerError.exact} path={Routes.ServerError.path} component={ServerError} />
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
