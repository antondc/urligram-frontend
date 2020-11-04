import { createSelector } from 'reselect';

import { LanguagesState,LanguageState } from './../languages.types';
import { selectLanguages } from './selectLanguages';

export const selectCurrentLanguage = createSelector(
  selectLanguages,
  (Languages: LanguagesState): LanguageState => Languages.currentLanguage
);
