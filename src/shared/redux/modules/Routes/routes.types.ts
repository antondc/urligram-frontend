export const PUSH_NEW_ROUTE = 'PUSH_NEW_ROUTE';

export interface RoutesState {
  routes: RouteState[];
  history: RouteState[];
  currentRoute?: RouteState;
}

export interface RouteState {
  name: string;
  pathname: string;
  regex: string;
  exact: boolean;
  auth: boolean;
  queryparams?: {};
}

interface PushNewRouteAction {
  type: typeof PUSH_NEW_ROUTE;
  data: RouteState;
}

export type RoutesTypes = PushNewRouteAction;
