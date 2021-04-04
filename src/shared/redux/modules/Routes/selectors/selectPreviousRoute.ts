import { createSelector } from 'reselect';

import { RoutesState, RouteState } from './../routes.types';
import { selectRoutes } from './selectRoutes';

export const selectPreviousRoute = createSelector(
  selectRoutes,
  (routes: RoutesState): RouteState => routes?.history[routes?.history?.length - 2]
);
