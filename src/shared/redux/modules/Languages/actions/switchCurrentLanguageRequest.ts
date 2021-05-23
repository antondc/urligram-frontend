import { LANGUAGES_SWITCH_CURRENT_REQUEST, LanguagesActions, LanguagesState } from 'Modules/Languages/languages.types';

export const switchCurrentLanguageRequest = (payload: LanguagesState): LanguagesActions => ({
  type: LANGUAGES_SWITCH_CURRENT_REQUEST,
  payload,
});
