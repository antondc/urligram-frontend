import { createSelector } from 'reselect';
import get from 'lodash/get';

import { ParamsState, RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteQueryParams = createSelector(
  selectCurrentRoute,
  (currentRoute: RouteState): ParamsState => get(currentRoute, 'queryParams', '')
);
