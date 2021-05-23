import { Route } from 'Router/routes';
import { Location } from 'Services/History';

export const ROUTES_NEW_ROUTE_PUSH = 'ROUTES_NEW_ROUTE_PUSH';

export interface RoutesState {
  routes: RouteState[];
  history: RouteState[];
  currentRoute?: RouteState;
}

export interface ParamsState {
  [key: string]: string | number;
}

export interface RouteState extends Route, Location {
  domain?: string;
  href: string;
  pathAndQuery: string;
  params?: ParamsState;
  queryParams?: ParamsState;
}

interface PushNewRouteAction {
  type: typeof ROUTES_NEW_ROUTE_PUSH;
  payload: RoutesState;
}

export type RoutesActions = PushNewRouteAction;
