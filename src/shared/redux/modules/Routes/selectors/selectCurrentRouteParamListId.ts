import { createSelector } from 'reselect';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteParamListId = createSelector(selectCurrentRoute, (currentRoute: RouteState): number =>
  currentRoute?.params?.listId ? Number(currentRoute?.params?.listId) : undefined
);
