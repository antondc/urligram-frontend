import { createSelector } from 'reselect';

import { LanguagesState } from './../languages.types';
import { selectLanguages } from './selectLanguages';

export const selectLanguagesSlugList = createSelector(selectLanguages, (Languages: LanguagesState): string[] =>
  Object.keys(Languages.byKey)
);
