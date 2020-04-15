import {
  SWITCH_CURRENT_LANGUAGE_RECEIVE,
  LanguagesActionsTypes,
  LanguageState,
} from 'Modules/Languages/languages.types';

export const switchCurrentLanguageReceive = (data: LanguageState): LanguagesActionsTypes => {
  return {
    type: SWITCH_CURRENT_LANGUAGE_RECEIVE,
    data,
  };
};
