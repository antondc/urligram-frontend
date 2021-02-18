import { createSelector } from 'reselect';
import get from 'lodash/get';

import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteQueryParamPage = createSelector(selectCurrentRoute, (currentRoute: RouteState): {
  size: number;
  offset: number;
} => ({
  size: Number(get(currentRoute, 'queryParams.page.size', DEFAULT_PAGE_SIZE)),
  offset: Number(get(currentRoute, 'queryParams.page.offset', 0)),
}));
