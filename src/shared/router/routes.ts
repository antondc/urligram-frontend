import omit from 'lodash/omit';

import { initialBookmarksLoader } from 'Modules/Bookmarks/bookmarks.loader';
import { initialLinkLoader } from 'Modules/Links/link.loader';
import { initialListLoader } from 'Modules/Lists/list.loader';
import { initialListsLoader } from 'Modules/Lists/lists.loader';
import { tagsAllInitialLoader } from 'Modules/Tags/tags.loader';
import { initialUserLoader } from 'Modules/Users/user.loader';
import { initialUsersLoader } from 'Modules/Users/users.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';

type Layout = 'withLeftSidebar' | 'fullPage' | 'noHeader';

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

interface RoutesInterface {
  Docs: Route;
  Tags: Route;
  Home: Route;
  Link: Route;
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
  SignUpConfirmation: Route;
  ForgotPassword: Route;
  ResetPassword: Route;
  WelcomeUrligram: Route;
  FAQ: Route;
  Extension: Route;
  ServerError: Route;
  NotFound: Route;
}

export const Routes: RoutesInterface = {
  Docs: {
    name: 'Docs',
    path: '/:lang([a-z]{2})?/docs',
    route: '/docs',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'noHeader',
  },

  Tags: {
    name: 'Tags',
    path: '/:lang([a-z]{2})?/tags',
    route: '/tags',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [tagsAllInitialLoader],
    initialDataLoadersSession: [tagsAllInitialLoader],
    layout: 'withLeftSidebar',
  },

  Link: {
    name: 'Link',
    path: '/:lang([a-z]{2})?/link/:linkId',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [initialLinkLoader],
    initialDataLoadersSession: [initialLinkLoader],
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
    initialDataLoadersVisitor: [initialUserLoader],
    initialDataLoadersSession: [initialUserLoader],
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
    initialDataLoadersVisitor: [initialUsersLoader],
    initialDataLoadersSession: [initialUsersLoader],
    layout: 'withLeftSidebar',
  },

  List: {
    name: 'List',
    path: '/:lang([a-z]{2})?/lists/:listId',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [initialListLoader],
    initialDataLoadersSession: [initialListLoader],
    layout: 'withLeftSidebar',
  },

  Lists: {
    name: 'Lists',
    path: '/:lang([a-z]{2})?/lists',
    route: '/lists',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [initialListsLoader],
    initialDataLoadersSession: [initialListsLoader],
    layout: 'withLeftSidebar',
  },

  Extension: {
    name: 'Extension',
    path: '/:lang([a-z]{2})?/extension',
    route: '/extension',
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
    initialDataLoadersVisitor: [initialBookmarksLoader],
    initialDataLoadersSession: [initialBookmarksLoader],
    layout: 'withLeftSidebar',
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

  WelcomeUrligram: {
    name: 'WelcomeUrligram',
    path: '/:lang([a-z]{2})?/welcome-urligram',
    route: '/welcome-urligram',
    exact: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: 'noHeader',
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
