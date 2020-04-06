import Home from './Home';
import Control from './Control';
import Login from './Login';
import NotFound from './NotFound';
// import actions from '../redux/actions';

const Routes = {
  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    exact: true,
    auth: false,
    component: Login,
    hasHeader: false,
    hasFooter: false,
    loadInitialData: () => {},
  },

  Control: {
    name: 'Control',
    path: '/control',
    exact: true,
    auth: true,
    component: Control,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: () => {},
  },

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    exact: true,
    auth: false,
    component: Home,
    hasHeader: true,
    hasFooter: true,
    loadInitialData: () => {},
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
