import { createSelector } from 'reselect';
import { LanguageState } from '../languages.types';
import { selectCurrentLanguage } from './selectCurrentLanguage';

export const selectCurrentLanguageSlug = createSelector(
  selectCurrentLanguage,
  (currentLanguage: LanguageState): string => currentLanguage.slug
);
