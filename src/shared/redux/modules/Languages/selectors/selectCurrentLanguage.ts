import { LanguageState, LanguagesState } from './../languages.types';
import { createSelector } from 'reselect';
import { selectLanguages } from './selectLanguages';

export const selectCurrentLanguage = createSelector(
  selectLanguages,
  (Languages: LanguagesState): LanguageState => Languages.currentLanguage
);
