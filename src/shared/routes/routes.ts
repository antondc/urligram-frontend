import Home from './Home';
import Control from './Control';
import Login from './Login';
import NotFound from './NotFound';
import { loadMockDataTwo } from './../redux/modules/MockDataTwo/actions/loadMockDataTwo';
import { loadMockDataOne } from './../redux/modules/MockDataOne/actions/loadMockDataOne';

const Routes = {
  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    exact: true,
    auth: false,
    component: Login,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: [loadMockDataOne, loadMockDataTwo],
  },

  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    exact: true,
    auth: true,
    component: Control,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [loadMockDataOne, loadMockDataTwo],
  },

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    component: Home,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: [loadMockDataOne, loadMockDataTwo],
  },

  NotFound: {
    name: 'NotFound',
    path: '*',
    hasHeader: true,
    hasFooter: true,
    auth: false,
    header: false,
    component: NotFound,
  },
};

export default Routes;
