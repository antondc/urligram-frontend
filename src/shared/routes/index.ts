import omit from 'lodash/omit';

import { initialBookmarksLoader } from 'Modules/Bookmarks/bookmarks.loader';
import { initialLinksLoader } from 'Modules/Links/links.loader';
import { initialPopularListsLoader } from 'Modules/Sections/sections.loader';
import { initialUserLoader } from 'Modules/Users/user.loader';
import { initialUsersLoader } from 'Modules/Users/users.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { initialListsLoader } from '../redux/modules/Lists/lists.loader';

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
  Bookmarks: {
    name: 'Bookmarks',
    path: '/:lang([a-z]{2})?/bookmarks',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialBookmarksLoader, initialPopularListsLoader],
  },

  User: {
    name: 'User',
    path: '/:lang([a-z]{2})?/users/:userId',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUserLoader, initialPopularListsLoader],
  },

  Users: {
    name: 'Users',
    path: '/:lang([a-z]{2})?/users',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialUsersLoader, initialPopularListsLoader],
  },

  Links: {
    name: 'Links',
    path: '/:lang([a-z]{2})?/links',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialLinksLoader, initialPopularListsLoader],
  },

  Lists: {
    name: 'Lists',
    path: '/:lang([a-z]{2})?/lists',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [initialListsLoader, initialPopularListsLoader],
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

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    hasHeader: true,
    hasFooter: true,
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
