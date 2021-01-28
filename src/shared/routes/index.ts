import omit from 'lodash/omit';

import { initialBookmarksLoader } from 'Modules/Bookmarks/bookmarks.loader';
import { initialLinksLoader } from 'Modules/Links/links.loader';
import { initialListsLoader } from 'Modules/Lists/lists.loader';
import { mostFollowedUsersInitialLoader } from 'Modules/Sections/initialLoaders/mostFollowedUsersInitialLoader';
import { myListsInitialLoader } from 'Modules/Sections/initialLoaders/myListsInitialLoader';
import { newListsInitialLoader } from 'Modules/Sections/initialLoaders/newListsInitialLoader';
import { newUsersInitialLoader } from 'Modules/Sections/initialLoaders/newUsersInitialLoader';
import { popularListsInitialLoader } from 'Modules/Sections/initialLoaders/popularListsInitialLoader';
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
  loadInitialData?: Array<(params: RequestParameters) => void>;
}

export interface RoutesInterface {
  [key: string]: Route;
}

const Routes: RoutesInterface = {
  BookmarksVisitor: {
    name: 'BookmarksVisitor',
    path: '/:lang([a-z]{2})?/bookmarks',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialBookmarksLoader],
  },

  BookmarksUser: {
    name: 'BookmarksUser',
    path: '/:lang([a-z]{2})?/bookmarks',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialBookmarksLoader],
  },

  UserVisitor: {
    name: 'UserVisitor',
    path: '/:lang([a-z]{2})?/users/:userId',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUserLoader],
  },

  UserUser: {
    name: 'UserUser',
    path: '/:lang([a-z]{2})?/users/:userId',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUserLoader],
  },

  UsersUser: {
    name: 'UsersUser',
    path: '/:lang([a-z]{2})?/users',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUsersLoader],
  },

  UsersVisitor: {
    name: 'UsersVisitor',
    path: '/:lang([a-z]{2})?/users',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUsersLoader],
  },

  Users: {
    name: 'Users',
    path: '/:lang([a-z]{2})?/users',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUsersLoader],
  },

  LinksVisitor: {
    name: 'LinksVisitor',
    path: '/:lang([a-z]{2})?/links',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialLinksLoader],
  },

  LinksUser: {
    name: 'LinksUser',
    path: '/:lang([a-z]{2})?/links',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialLinksLoader],
  },

  ListsVisitor: {
    name: 'ListsVisitor',
    path: '/:lang([a-z]{2})?/lists',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialListsLoader],
  },

  ListsUser: {
    name: 'ListsUser',
    path: '/:lang([a-z]{2})?/lists',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialListsLoader],
  },

  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [],
  },

  SignIn: {
    name: 'SignIn',
    path: '/:lang([a-z]{2})?/sign-in',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [],
  },

  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    exact: true,
    auth: true,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [],
  },

  HomeUser: {
    name: 'HomeUser',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [myListsInitialLoader],
  },

  HomeVisitor: {
    name: 'HomeVisitor',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: true,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [
      mostFollowedUsersInitialLoader,
      popularListsInitialLoader,
      newListsInitialLoader,
      newUsersInitialLoader,
    ],
  },

  ServerError: {
    name: 'ServerError',
    path: '/:lang([a-z]{2})?/500-server-error',
    exact: true,
    hasHeader: true,
    hasFooter: true,
    auth: false,
    header: false,
    loadInitialData: [],
  },

  NotFound: {
    name: 'NotFound',
    path: '/:lang([a-z]{2})?/:path*',
    exact: false,
    hasHeader: true,
    hasFooter: true,
    auth: false,
    header: false,
    loadInitialData: [],
  },
};

// Export routes without specific values values
export const routesWithoutOmmitedValues: RoutesInterface = Object.entries(Routes).reduce((acc, [key, value]) => {
  const valuesToRemove = ['loadInitialData' /* etc. */];
  const routeWithoutOmmitedValues = omit(value, valuesToRemove);

  return { ...acc, [key]: routeWithoutOmmitedValues };
}, {});

export const routesPathsList: string[] = Object.values(Routes).map((item) => item.path);

export const routesList: Route[] = Object.values(Routes);

export default Routes;
