import {
  LanguagesActionsTypes,
  LanguageState,
  SWITCH_CURRENT_LANGUAGE_RECEIVE,
} from 'Modules/Languages/languages.types';

export const switchCurrentLanguageReceive = (data: LanguageState): LanguagesActionsTypes => ({
  type: SWITCH_CURRENT_LANGUAGE_RECEIVE,
  data,
});
