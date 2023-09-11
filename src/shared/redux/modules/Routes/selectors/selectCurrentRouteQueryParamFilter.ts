import { createSelector } from 'reselect';
import get from 'lodash/get';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

type QueryParamFilter = {
  [key: string]: Array<string | number>;
};

export const selectCurrentRouteQueryParamFilter = createSelector(
  selectCurrentRoute,
  (currentRoute: RouteState): QueryParamFilter => get(currentRoute, 'queryParams.filter', {}) as QueryParamFilter
);
