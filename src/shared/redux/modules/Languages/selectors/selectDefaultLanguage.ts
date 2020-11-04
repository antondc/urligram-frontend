import { createSelector } from 'reselect';

import { LanguagesState,LanguageState } from './../languages.types';
import { selectLanguages } from './selectLanguages';

export const selectDefaultLanguage = createSelector(
  selectLanguages,
  (Languages: LanguagesState): LanguageState => {
    const keys = Object.keys(Languages.byKey);
    const keyDefault = keys.find((key) => Languages.byKey[key].isDefault === true);
    const defaultLanguage = Languages.byKey[keyDefault];

    return defaultLanguage;
  }
);
