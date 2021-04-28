import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import SidebarLeft from 'Components/SidebarLeft';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import Bookmarks from 'Pages/Bookmarks';
import Followers from 'Pages/Followers';
import Following from 'Pages/Following';
import Home from 'Pages/Home';
import List from 'Pages/List';
import Lists from 'Pages/Lists';
import Tags from 'Pages/Tags';
import User from 'Pages/User';
import UserBookmarks from 'Pages/UserBookmarks';
import UserLists from 'Pages/UserLists';
import Users from 'Pages/Users';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';
import { Fade, FadeInOut, Flex, Hr } from 'Vendor/components';

import './Content.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  pathWithoutLanguageParam: string;
}

const Content: React.FC<Props> = ({ location, pathWithoutLanguageParam }) => (
  <>
    <Hr spacer size="big" />
    <div className="Content">
      <Flex vertical="top">
        <Fade classname="Content-sidebarLeft" mounted speed="fastest" delayIn={250} appear>
          <SidebarLeft />
        </Fade>
        <div className="Content-content">
          <FadeInOut valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear>
            <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
              <Route exact={Routes.UserBookmarks.exact} path={Routes.UserBookmarks.path} component={UserBookmarks} />
              <Route exact={Routes.User.exact} path={Routes.User.path} component={User} />
              <Route exact={Routes.Users.exact} path={Routes.Users.path} component={Users} />
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

export default connect(mapStateToProps, {})(Content);
