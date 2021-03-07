import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
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
import { Fade, FadeInOut, Flex, Hr } from '@antoniodcorrea/components';
import SidebarLeft from '../../components/SidebarLeft';

import './RouterContent.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  pathWithoutLanguageParam: string;
}

const RouterContent: React.FC<Props> = ({ location, pathWithoutLanguageParam }) => (
  <>
    <Hr spacer size="big" />
    <div className="RouterContent">
      <Flex vertical="top">
        <Fade classname="RouterContent-sidebarLeft" mounted speed="fastest" delayIn={250} appear>
          <SidebarLeft />
        </Fade>
        <div className="RouterContent-content">
          <FadeInOut valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear>
            <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
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
            </Switch>
          </FadeInOut>
        </div>
      </Flex>
    </div>
  </>
);

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(RouterContent);
