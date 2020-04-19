import { createSelector } from 'reselect';
import { LanguageState } from '../languages.types';
import { selectCurrentLanguage } from './selectCurrentLanguage';
import get from 'lodash/get';
export const selectCurrentLanguageSlug = createSelector(
  selectCurrentLanguage,
  (currentLanguage: LanguageState): string => get(currentLanguage, 'slug', '')
);
