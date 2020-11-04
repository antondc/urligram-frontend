import { createSelector } from 'reselect';

import { selectDefaultLanguageSlug } from 'Modules/Languages/selectors/selectDefaultLanguageSlug';
import { selectCurrentRouteParamLanguage } from './selectCurrentRouteParamLanguage';

export const selectCurrentRouteParamLanguageOrDefault = createSelector(
  selectCurrentRouteParamLanguage,
  selectDefaultLanguageSlug,
  (currentRouteParamLanguage: string, defaultLanguageSlug: string): string =>
    currentRouteParamLanguage || defaultLanguageSlug
);
