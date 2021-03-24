import { LANGUAGES_SWITCH_CURRENT_SUCCESS, LanguagesActions, LanguagesState } from 'Modules/Languages/languages.types';

export const switchCurrentLanguageReceive = (payload: LanguagesState): LanguagesActions => ({
  type: LANGUAGES_SWITCH_CURRENT_SUCCESS,
  payload,
});
