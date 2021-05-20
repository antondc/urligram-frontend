import { LANGUAGES_LOAD_SUCCESS, LanguagesActions, LanguagesState } from 'Modules/Languages/languages.types';

export const receiveLanguages = (payload: LanguagesState): LanguagesActions => ({
  type: LANGUAGES_LOAD_SUCCESS,
  payload,
});
