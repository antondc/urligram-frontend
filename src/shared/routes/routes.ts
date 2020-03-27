import Home from './Home/HomeConnect';
import Control from './Control/ControlConnect';
import Login from './Login/LoginConnect';
import NotFound from './NotFound/NotFound';

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
  },

  Control: {
    name: 'Control',
    path: '/control',
    exact: true,
    auth: true,
    component: Control,
    hasHeader: true,
    hasFooter: true,
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
