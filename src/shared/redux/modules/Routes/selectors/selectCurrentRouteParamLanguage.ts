import { createSelector } from 'reselect';
import get from 'lodash/get';

import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteParamLanguage = createSelector(selectCurrentRoute, (currentRoute: RouteState): string =>
  get(currentRoute, 'params.lang', '')
);
