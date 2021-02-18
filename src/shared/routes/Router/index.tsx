import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectPathAndQueryWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathAndQueryWithoutLanguageParam';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import Bookmarks from 'Routes/Bookmarks';
import Control from 'Routes/Control';
import Followers from 'Routes/Followers';
import Following from 'Routes/Following';
import Home from 'Routes/Home';
import Routes from 'Routes/index';
import Links from 'Routes/Links';
import List from 'Routes/List';
import Lists from 'Routes/Lists';
import Login from 'Routes/Login';
import NotFound from 'Routes/NotFound';
import ServerError from 'Routes/ServerError';
import SignIn from 'Routes/SignIn';
import Tags from 'Routes/Tags';
import User from 'Routes/User';
import UserBookmarks from 'Routes/UserBookmarks';
import UserLists from 'Routes/UserLists';
import Users from 'Routes/Users';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';

import './Router.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
  pathAndQueryWithoutLanguageParam: string;
}

const Router: React.FC<Props> = ({
  loggedIn,
  location,
  defaultCurrentSlug,
  pathWithoutLanguageParam,
  pathAndQueryWithoutLanguageParam,
}) => (
  <div className="Router">
    <FadeInOut valueToUpdate={pathAndQueryWithoutLanguageParam} appear>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        {/* Redirects */}
        {loggedIn && <Redirect from="/:lang?/login" to={'/' + defaultCurrentSlug + '/control'} />}
        {!loggedIn && <Redirect from="/:lang?/control" to={'/' + defaultCurrentSlug + '/sign-in'} />}

        {/* Pages */}
        <Route exact={Routes.UserBookmarks.exact} path={Routes.UserBookmarks.path} component={UserBookmarks} />
        <Route exact={Routes.User.exact} path={Routes.User.path} component={User} />
        <Route exact={Routes.Users.exact} path={Routes.Users.path} component={Users} />
        <Route exact={Routes.Links.exact} path={Routes.Links.path} component={Links} />
        <Route exact={Routes.List.exact} path={Routes.List.path} component={List} />
        <Route exact={Routes.Lists.exact} path={Routes.Lists.path} component={Lists} />
        <Route exact={Routes.Bookmarks.exact} path={Routes.Bookmarks.path} component={Bookmarks} />
        <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
        <Route exact={Routes.Followers.exact} path={Routes.Followers.path} component={Followers} />
        <Route exact={Routes.Following.exact} path={Routes.Following.path} component={Following} />
        <Route exact={Routes.UserLists.exact} path={Routes.UserLists.path} component={UserLists} />
        <Route exact={Routes.Tags.exact} path={Routes.Tags.path} component={Tags} />

        {/* General */}
        <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
        <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />
        <Route exact={Routes.SignIn.exact} path={Routes.SignIn.path} component={SignIn} />

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
  pathAndQueryWithoutLanguageParam: selectPathAndQueryWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(Router);
