import { createSelector } from 'reselect';

import { RoutesState, RouteState } from './../routes.types';
import { selectRoutes } from './selectRoutes';

export const selectCurrentRoute = createSelector(
  selectRoutes,
  (routes: RoutesState): RouteState => routes.currentRoute
);
