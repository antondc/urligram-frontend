import { createSelector } from 'reselect';
import get from 'lodash/get';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteParamListId = createSelector(selectCurrentRoute, (currentRoute: RouteState): number =>
  Number(get(currentRoute, 'params.listId', ''))
);
