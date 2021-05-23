import { createSelector } from 'reselect';
import get from 'lodash/get';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteQueryParamFilter = createSelector(selectCurrentRoute, (currentRoute: RouteState): {
  [key: string]: Array<string | number>;
} => get(currentRoute, 'queryParams.filter', ''));
