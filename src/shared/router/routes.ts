import omit from 'lodash/omit';

import { RequestParameters } from 'Root/src/server/routes/allRoutes';

type Layout = 'withLeftSidebar' | 'fullPage';

export interface Route {
  name: string;
  path: string;
  route?: string;
  exact: boolean;
  auth: boolean;
  header?: boolean;
  initialDataLoadersVisitor?: Array<(params: RequestParameters) => void>;
  initialDataLoadersSession?: Array<(params: RequestParameters) => void>;
  layout?: Layout;
}

export interface RoutesInterface {
  Tags: Route;
  Bookmarks: Route;
  UserBookmarks: Route;
  UserLists: Route;
  Following: Route;
  Followers: Route;
  User: Route;
  UserTags: Route;
  Users: Route;
  List: Route;
  Lists: Route;
  Login: Route;
  SignUp: Route;
  Home: Route;
  About: Route;
  ForgotPassword: Route;
  ResetPassword: Route;
  SignUpConfirmation: Route;
  Control: Route;
  FAQ: Route;
  Download: Route;
  Disclaimer: Route;
  ServerError: Route;
  NotFound: Route;
}

export const Routes: RoutesInterface = {
  Tags: {
    name: 'Tags',
    path: '/:lang([a-z]{2})?/tags',
    route: '/tags',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Bookmarks: {
    name: 'Bookmarks',
    path: '/:lang([a-z]{2})?/bookmarks',
    route: '/bookmarks',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  UserBookmarks: {
    name: 'UserBookmarks',
    path: '/:lang([a-z]{2})?/users/:userId/bookmarks',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  UserLists: {
    name: 'UserLists',
    path: '/:lang([a-z]{2})?/users/:userId/lists',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Following: {
    name: 'Following',
    path: '/:lang([a-z]{2})?/users/:userId/following',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Followers: {
    name: 'Followers',
    path: '/:lang([a-z]{2})?/users/:userId/followers',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  User: {
    name: 'User',
    path: '/:lang([a-z]{2})?/users/:userId',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  UserTags: {
    name: 'UserTags',
    path: '/:lang([a-z]{2})?/users/:userId/tags',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Users: {
    name: 'Users',
    path: '/:lang([a-z]{2})?/users',
    route: '/users',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  List: {
    name: 'List',
    path: '/:lang([a-z]{2})?/lists/:listId',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Lists: {
    name: 'Lists',
    path: '/:lang([a-z]{2})?/lists',
    route: '/lists',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'withLeftSidebar',
  },

  Disclaimer: {
    name: 'Disclaimer',
    path: '/:lang([a-z]{2})?/disclaimer',
    route: '/disclaimer',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  Download: {
    name: 'Download',
    path: '/:lang([a-z]{2})?/download',
    route: '/download',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  FAQ: {
    name: 'FAQ',
    path: '/:lang([a-z]{2})?/faq',
    route: '/faq',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    route: '/login',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  SignUp: {
    name: 'SignUp',
    path: '/:lang([a-z]{2})?/sign-up',
    route: '/sign-up',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    route: '/',
    exact: true,
    auth: false,
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
    route: '/about',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  ForgotPassword: {
    name: 'ForgotPassword',
    path: '/:lang([a-z]{2})?/forgot-password',
    route: '/forgot-password',
    exact: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  ResetPassword: {
    name: 'ResetPassword',
    path: '/:lang([a-z]{2})?/reset-password',
    route: '/reset-password',
    exact: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  SignUpConfirmation: {
    name: 'SignUpConfirmation',
    path: '/:lang([a-z]{2})?/sign-up-confirmation',
    route: '/sign-up-confirmation',
    exact: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    route: '/control',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  ServerError: {
    name: 'ServerError',
    path: '/:lang([a-z]{2})?/500-server-error',
    route: '/500-server-error',
    exact: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },

  NotFound: {
    name: 'NotFound',
    path: '/:lang([a-z]{2})?/:path*',
    route: '/not-found',
    exact: false,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'fullPage',
  },
};

// Export routes without specific values values
export const routesWithoutOmmitedValues: Partial<RoutesInterface> = Object.entries(Routes).reduce(
  (acc, [key, value]) => {
    const valuesToRemove = ['initialDataLoadersVisitor', 'initialDataLoadersSession' /* etc. */];
    const routeWithoutOmmitedValues = omit(value, valuesToRemove);

    return { ...acc, [key]: routeWithoutOmmitedValues };
  },
  {}
);

export const pathsByLayout = (layout: Layout): string[] =>
  Object.values(Routes)
    .filter((value) => value.layout === layout)
    .map((item) => item.path);

export const routesPathsList: string[] = Object.values(Routes).map((item) => item.path);

export const routesList: Route[] = Object.values(Routes);
