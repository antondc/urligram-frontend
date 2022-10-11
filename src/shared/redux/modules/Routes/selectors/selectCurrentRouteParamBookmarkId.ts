import { createSelector } from 'reselect';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteParamBookmarkId = createSelector(
  selectCurrentRoute,
  (currentRoute: RouteState): number =>
    currentRoute?.params?.bookmarkId ? Number(currentRoute?.params?.bookmarkId) : undefined
);
