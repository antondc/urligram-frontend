import { Route } from 'Routes/index';
import { Location } from 'Services/History';

export const PUSH_NEW_ROUTE = 'PUSH_NEW_ROUTE';

export interface RoutesState {
  routes: RouteState[];
  history: RouteState[];
  currentRoute?: RouteState;
}

export interface RouteState extends Route, Location {
  params?: {
    [key: string]: string | number;
  };
  queryParams?: {
    [key: string]: string | number;
  };
}

interface PushNewRouteAction {
  type: typeof PUSH_NEW_ROUTE;
  data: RouteState;
}

export type RoutesTypes = PushNewRouteAction;
