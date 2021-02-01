import omit from 'lodash/omit';

import { initialBookmarksLoader } from 'Modules/Bookmarks/bookmarks.loader';
import { initialLinksLoader } from 'Modules/Links/links.loader';
import { initialListsLoader } from 'Modules/Lists/lists.loader';
import { followingListsInitialLoader } from 'Modules/Sections/initialLoaders/followingListsInitialLoader';
import { followingUsersInitialLoader } from 'Modules/Sections/initialLoaders/followingUsersInitialLoad';
import { mostFollowedUsersInitialLoader } from 'Modules/Sections/initialLoaders/mostFollowedUsersInitialLoader';
import { myListsInitialLoader } from 'Modules/Sections/initialLoaders/myListsInitialLoader';
import { myTagsInitialLoader } from 'Modules/Sections/initialLoaders/myTagsInitialLoader';
import { newListsInitialLoader } from 'Modules/Sections/initialLoaders/newListsInitialLoader';
import { newUsersInitialLoader } from 'Modules/Sections/initialLoaders/newUsersInitialLoader';
import { popularListsInitialLoader } from 'Modules/Sections/initialLoaders/popularListsInitialLoader';
import { tagsAllInitialLoader } from 'Modules/Tags/initialLoaders/tagsAllInitialLoader';
import { initialUserLoader } from 'Modules/Users/user.loader';
import { initialUsersLoader } from 'Modules/Users/users.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  auth: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  header?: boolean;
  initialDataLoadersVisitor?: Array<(params: RequestParameters) => void>;
  initialDataLoadersSession?: Array<(params: RequestParameters) => void>;
}

export interface RoutesInterface {
  [key: string]: Route;
}

const Routes: RoutesInterface = {
  Bookmarks: {
    name: 'Bookmarks',
    path: '/:lang([a-z]{2})?/bookmarks',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialBookmarksLoader],
    initialDataLoadersSession: [initialBookmarksLoader],
  },

  User: {
    name: 'User',
    path: '/:lang([a-z]{2})?/users/:userId',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialUserLoader],
    initialDataLoadersSession: [initialUserLoader],
  },

  Users: {
    name: 'Users',
    path: '/:lang([a-z]{2})?/users',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialUsersLoader],
    initialDataLoadersSession: [initialUsersLoader],
  },

  Links: {
    name: 'Links',
    path: '/:lang([a-z]{2})?/links',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialLinksLoader],
    initialDataLoadersSession: [initialLinksLoader],
  },

  Lists: {
    name: 'Lists',
    path: '/:lang([a-z]{2})?/lists',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialListsLoader],
    initialDataLoadersSession: [initialListsLoader],
  },

  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
  },

  SignIn: {
    name: 'SignIn',
    path: '/:lang([a-z]{2})?/sign-in',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
  },

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    hasHeader: true,
    hasFooter: true,
    initialDataLoadersVisitor: [
      tagsAllInitialLoader,
      mostFollowedUsersInitialLoader,
      popularListsInitialLoader,
      newListsInitialLoader,
      newUsersInitialLoader,
    ],
    initialDataLoadersSession: [
      myListsInitialLoader,
      followingListsInitialLoader,
      myTagsInitialLoader,
      followingUsersInitialLoader,
    ],
  },

  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    exact: true,
    auth: true,
    hasHeader: true,
    hasFooter: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
  },

  ServerError: {
    name: 'ServerError',
    path: '/:lang([a-z]{2})?/500-server-error',
    exact: true,
    hasHeader: true,
    hasFooter: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
  },

  NotFound: {
    name: 'NotFound',
    path: '/:lang([a-z]{2})?/:path*',
    exact: false,
    hasHeader: true,
    hasFooter: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
  },
};

// Export routes without specific values values
export const routesWithoutOmmitedValues: RoutesInterface = Object.entries(Routes).reduce((acc, [key, value]) => {
  const valuesToRemove = ['initialDataLoadersVisitor', 'initialDataLoadersSession' /* etc. */];
  const routeWithoutOmmitedValues = omit(value, valuesToRemove);

  return { ...acc, [key]: routeWithoutOmmitedValues };
}, {});

export const routesPathsList: string[] = Object.values(Routes).map((item) => item.path);

export const routesList: Route[] = Object.values(Routes);

export default Routes;
