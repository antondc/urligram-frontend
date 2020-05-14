import { createSelector } from 'reselect';
import { selectCurrentRouteParamLanguage } from './selectCurrentRouteParamLanguage';
import { selectDefaultLanguageSlug } from 'Modules/Languages/selectors/selectDefaultLanguageSlug';

export const selectCurrentRouteParamLanguageOrDefault = createSelector(
  selectCurrentRouteParamLanguage,
  selectDefaultLanguageSlug,
  (currentRouteParamLanguage: string, defaultLanguageSlug: string): string =>
    currentRouteParamLanguage || defaultLanguageSlug
);
