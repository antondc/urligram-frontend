import { createSelector } from 'reselect';
import { selectCurrentRoute } from './selectCurrentRoute';
import { RouteState } from './../routes.types';

export const selectCurrentPathname = createSelector(selectCurrentRoute, (route: RouteState): string => route.pathname);
