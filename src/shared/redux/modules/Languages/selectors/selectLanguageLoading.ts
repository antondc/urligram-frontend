import { LanguagesState } from '../languages.types';
import { createSelector } from 'reselect';
import { selectLanguages } from './selectLanguages';

export const selectLanguageLoading = createSelector(
  selectLanguages,
  (Languages: LanguagesState): boolean => Languages.currentLanguage.loading
);
