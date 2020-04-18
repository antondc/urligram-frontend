export const PUSH_NEW_ROUTE = 'PUSH_NEW_ROUTE';

export interface RoutesState {
  routes: RouteState[];
  history: RouteState[];
  currentRoute?: RouteState;
}

export interface RouteState {
  name: string;
  path: string;
  pathname?: string;
  exact: boolean;
  auth: boolean;
  component: any;
  hasHeader: boolean;
  hasFooter: boolean;
  params?: {
    [key: string]: string | number;
  };
  queryParams?: {
    [key: string]: string | number;
  };
  loadInitialData: Function[];
}

interface PushNewRouteAction {
  type: typeof PUSH_NEW_ROUTE;
  data: RouteState;
}

export type RoutesTypes = PushNewRouteAction;
