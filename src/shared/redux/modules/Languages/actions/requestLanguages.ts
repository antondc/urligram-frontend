import { LanguagesActionsTypes,LOAD_LANGUAGES_STARTED } from 'Modules/Languages/languages.types';

export const requestLanguages = (): LanguagesActionsTypes => ({
  type: LOAD_LANGUAGES_STARTED,
  data: {
    loading: true,
  },
});
