import { SWITCH_CURRENT_LANGUAGE_REQUEST, LanguagesActionsTypes } from 'Modules/Languages/languages.types';

export const switchCurrentLanguageRequest = (): LanguagesActionsTypes => {
  return {
    type: SWITCH_CURRENT_LANGUAGE_REQUEST,
    data: {
      loading: true,
    },
  };
};
