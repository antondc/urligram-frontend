import { LanguageState, LanguagesState } from './../languages.types';
import { createSelector } from 'reselect';
import { selectLanguages } from './selectLanguages';

export const selectLanguagesList = createSelector(selectLanguages, (Languages: LanguagesState): LanguageState[] => {
  const languagesKeys = Object.keys(Languages.byKey);
  const languagesList = languagesKeys.map((key) => Languages.byKey[key]);

  return languagesList;
});
