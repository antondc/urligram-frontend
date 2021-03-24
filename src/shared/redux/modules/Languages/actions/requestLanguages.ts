import { LANGUAGES_LOAD_REQUEST, LanguagesActions, LanguagesState } from 'Modules/Languages/languages.types';

export const requestLanguages = (payload: LanguagesState): LanguagesActions => ({
  type: LANGUAGES_LOAD_REQUEST,
  payload,
});
