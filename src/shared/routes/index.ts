import omit from 'lodash/omit';
import { loadMockDataOne } from 'Modules/MockDataOne/actions/loadMockDataOne';
import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  auth: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  header?: boolean;
  loadInitialData?: Function[];
}

export interface RoutesInterface {
  [key: string]: Route;
}

const Routes: RoutesInterface = {
  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [loadMockDataOne],
  },

  SignIn: {
    name: 'SignIn',
    path: '/:lang([a-z]{2})?/sign-in',
    exact: true,
    auth: false,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [loadMockDataOne],
  },

  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    exact: true,
    auth: true,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [loadMockDataOne],
  },

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [loadBookmarks],
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
