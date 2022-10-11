import { createSelector } from 'reselect';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteParamLinkId = createSelector(selectCurrentRoute, (currentRoute: RouteState): number =>
  currentRoute?.params?.linkId ? Number(currentRoute?.params?.linkId) : undefined
);
