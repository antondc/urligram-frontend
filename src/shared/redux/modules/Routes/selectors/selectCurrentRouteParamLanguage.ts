import get from 'lodash/get';
import { createSelector } from 'reselect';
import { selectCurrentRoute } from './selectCurrentRoute';
import { RouteState } from '../routes.types';

export const selectCurrentRouteParamLanguage = createSelector(selectCurrentRoute, (currentRoute: RouteState): string =>
  get(currentRoute, 'params.lang', '')
);
