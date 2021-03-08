import omit from 'lodash/omit';

import { initialBookmarksLoader } from 'Modules/Bookmarks/bookmarks.loader';
import { initialListsLoader } from 'Modules/Lists/lists.loader';
import { initialUserLoader } from 'Modules/Users/user.loader';
import { initialUsersLoader } from 'Modules/Users/users.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';

type Layout = 'withLeftSidebar' | 'fullPage';

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
  layout?: Layout;
}

export interface RoutesInterface {
  [key: string]: Route;
}

export const Routes: RoutesInterface = {
  Tags: {
    name: 'Tags',
    path: '/:lang([a-z]{2})?/tags',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Bookmarks: {
    name: 'Bookmarks',
    path: '/:lang([a-z]{2})?/bookmarks',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialBookmarksLoader],
    initialDataLoadersSession: [initialBookmarksLoader],
    layout: 'withLeftSidebar',
  },

  UserBookmarks: {
    name: 'UserBookmarks',
    path: '/:lang([a-z]{2})?/users/:userId/bookmarks',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  UserLists: {
    name: 'UserLists',
    path: '/:lang([a-z]{2})?/users/:userId/lists',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Following: {
    name: 'Following',
    path: '/:lang([a-z]{2})?/users/:userId/following',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialUserLoader],
    initialDataLoadersSession: [initialUserLoader],
    layout: 'withLeftSidebar',
  },

  Followers: {
    name: 'Followers',
    path: '/:lang([a-z]{2})?/users/:userId/followers',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [initialUserLoader],
    initialDataLoadersSession: [initialUserLoader],
    layout: 'withLeftSidebar',
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
    layout: 'withLeftSidebar',
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
    layout: 'withLeftSidebar',
  },

  Links: {
    name: 'Links',
    path: '/:lang([a-z]{2})?/links',
    exact: false,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  List: {
    name: 'List',
    path: '/:lang([a-z]{2})?/lists/:listId',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
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
    layout: 'withLeftSidebar',
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
    layout: 'fullPage',
  },

  SignUp: {
    name: 'SignUp',
    path: '/:lang([a-z]{2})?/sign-up',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    hasHeader: true,
    hasFooter: true,
    initialDataLoadersVisitor: [
      // tagsAllInitialLoader,
      // mostFollowedUsersInitialLoader,
      // popularListsInitialLoader,
      // newListsInitialLoader,
      // newUsersInitialLoader,
    ],
    initialDataLoadersSession: [
      // myListsInitialLoader,
      // followingListsInitialLoader,
      // myTagsInitialLoader,
      // followingUsersInitialLoader,
    ],
    layout: 'withLeftSidebar',
  },

  About: {
    name: 'About',
    path: '/:lang([a-z]{2})?/about',
    exact: true,
    auth: true,
    hasHeader: true,
    hasFooter: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
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
    layout: 'fullPage',
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
    layout: 'fullPage',
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
    layout: 'fullPage',
  },
};

// Export routes without specific values values
export const routesWithoutOmmitedValues: RoutesInterface = Object.entries(Routes).reduce((acc, [key, value]) => {
  const valuesToRemove = ['initialDataLoadersVisitor', 'initialDataLoadersSession' /* etc. */];
  const routeWithoutOmmitedValues = omit(value, valuesToRemove);

  return { ...acc, [key]: routeWithoutOmmitedValues };
}, {});

export const pathsByLayout = (layout: Layout): string[] =>
  Object.values(Routes)
    .filter((value) => value.layout === layout)
    .map((item) => item.path);

export const routesPathsList: string[] = Object.values(Routes).map((item) => item.path);

export const routesList: Route[] = Object.values(Routes);
