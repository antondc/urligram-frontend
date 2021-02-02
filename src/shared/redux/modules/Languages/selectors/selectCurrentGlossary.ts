import { createSelector } from 'reselect';

import { GlossaryState, LanguageState } from './../languages.types';
import { selectCurrentLanguage } from './selectCurrentLanguage';

export const selectCurrentGlossary = createSelector(
  selectCurrentLanguage,
  (currentLanguage: LanguageState): GlossaryState => currentLanguage?.glossary
);
