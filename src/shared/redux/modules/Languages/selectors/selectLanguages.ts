import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { LanguagesState } from '../languages.types';

export const selectLanguages = createSelector(
  (state: RootState) => state,
  (state): LanguagesState => state.Languages
);
