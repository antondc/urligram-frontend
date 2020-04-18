import { createSelector } from 'reselect';
import { selectRoutes } from './selectRoutes';
import { RoutesState, RouteState } from './../routes.types';

export const selectCurrentRoute = createSelector(
  selectRoutes,
  (routes: RoutesState): RouteState => routes.currentRoute
);
