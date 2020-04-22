import omit from 'lodash/omit';
import { loadMockDataOne } from 'Modules/MockDataOne/actions/loadMockDataOne';

const Routes = {
  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
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
    loadInitialData: [loadMockDataOne],
  },

  NotFound: {
    name: 'NotFound',
    path: '/:path*',
    exact: false,
    hasHeader: true,
    hasFooter: true,
    auth: false,
    header: false,
    loadInitialData: [],
  },
};

// Export routes without specific values values
export const routesWithoutOmmitedValues = Object.entries(Routes).reduce((acc, [key, value]) => {
  const valuesToRemove = ['loadInitialData' /* etc. */];
  const routeWithoutOmmitedValues = omit(value, valuesToRemove);

  return { ...acc, [key]: routeWithoutOmmitedValues };
}, {});

export const routesPathsList = Object.values(Routes).map((item) => item.path);
export const routesList = Object.values(Routes);

export default Routes;
