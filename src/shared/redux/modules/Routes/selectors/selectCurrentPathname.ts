import { createSelector } from 'reselect';

import { RouteState } from './../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentPathname = createSelector(selectCurrentRoute, (route: RouteState): string => route?.pathname);
