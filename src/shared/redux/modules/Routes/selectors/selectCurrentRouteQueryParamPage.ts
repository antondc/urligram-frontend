import { createSelector } from 'reselect';
import get from 'lodash/get';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteQueryParamPage = createSelector(selectCurrentRoute, (currentRoute: RouteState): {
  size: number;
  offset: number;
} => get(currentRoute, 'queryParams.page', ''));
