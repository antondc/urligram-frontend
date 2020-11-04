import { LanguagesActionsTypes,SWITCH_CURRENT_LANGUAGE_REQUEST } from 'Modules/Languages/languages.types';

export const switchCurrentLanguageRequest = (): LanguagesActionsTypes => ({
  type: SWITCH_CURRENT_LANGUAGE_REQUEST,
  data: {
    loading: true,
  },
});
