import { LanguageState } from '../languages.types';
import { createSelector } from 'reselect';
import { selectDefaultLanguage } from './selectDefaultLanguage';

export const selectDefaultLanguageSlug = createSelector(
  selectDefaultLanguage,
  (defaultLanguage: LanguageState): string => defaultLanguage.slug
);
