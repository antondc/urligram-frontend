import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CookiesBanner from 'Components/CookiesBanner';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import SidebarLeft from 'Components/SidebarLeft';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import Followers from 'Pages/Followers';
import Following from 'Pages/Following';
import Home from 'Pages/Home';
import Link from 'Pages/Link';
import List from 'Pages/List';
import Lists from 'Pages/Lists';
import Tags from 'Pages/Tags';
import User from 'Pages/User';
import UserBookmarks from 'Pages/UserBookmarks';
import UserLists from 'Pages/UserLists';
import Users from 'Pages/Users';
import UserTags from 'Pages/UserTags';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';

import './Content.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  pathWithoutLanguageParam: string;
}

// Fades are commented out to mark the correct place to render them if needed
const Content: React.FC<Props> = ({ location, pathWithoutLanguageParam }) => {
  const sidebarLeftClosed = useSelector(selectUiSidebarleftState);

  return (
    <div className="Content">
      <div className="Content-contentBackground" />
      <Header />
      <CookiesBanner />
      <div className={'Content-content' + (sidebarLeftClosed ? ' Content-content--sidebarLeftClosed' : '')}>
        {/* INTENDED => <Fade classname="Content-sidebarLeft" mounted speed="fastest" delayIn={250} appear> */}
        <div className="Content-sidebar">
          <SidebarLeft />
        </div>
        {/* INTENDED => </Fade> */}
        {/* INTENDED =><FadeInOut valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear> */}
        <div className="Content-main">
          <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
            <Route exact={Routes.UserBookmarks.exact} path={Routes.UserBookmarks.path} component={UserBookmarks} />
            <Route exact={Routes.User.exact} path={Routes.User.path} component={User} />
            <Route exact={Routes.Users.exact} path={Routes.Users.path} component={Users} />
            <Route exact={Routes.List.exact} path={Routes.List.path} component={List} />
            <Route exact={Routes.Lists.exact} path={Routes.Lists.path} component={Lists} />
            <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
            <Route exact={Routes.Followers.exact} path={Routes.Followers.path} component={Followers} />
            <Route exact={Routes.Following.exact} path={Routes.Following.path} component={Following} />
            <Route exact={Routes.UserLists.exact} path={Routes.UserLists.path} component={UserLists} />
            <Route exact={Routes.UserTags.exact} path={Routes.UserTags.path} component={UserTags} />
            <Route exact={Routes.Tags.exact} path={Routes.Tags.path} component={Tags} />
            <Route exact={Routes.Link.exact} path={Routes.Link.path} component={Link} />
          </Switch>
        </div>
        {/* INTENDED => </FadeInOut> */}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(Content);
