import { createSelector } from 'reselect';

import { LanguageState } from '../languages.types';
import { selectDefaultLanguage } from './selectDefaultLanguage';

export const selectDefaultLanguageSlug = createSelector(
  selectDefaultLanguage,
  (defaultLanguage: LanguageState): string => defaultLanguage.slug
);
