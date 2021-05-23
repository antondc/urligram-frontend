import { createSelector } from 'reselect';
import get from 'lodash/get';

import { LanguageState } from '../languages.types';
import { selectCurrentLanguage } from './selectCurrentLanguage';

export const selectCurrentLanguageSlug = createSelector(
  selectCurrentLanguage,
  (currentLanguage: LanguageState): string => get(currentLanguage, 'slug', '')
);
