import { LanguagesActionsTypes, LanguagesState,LOAD_LANGUAGES_SUCCESS } from 'Modules/Languages/languages.types';

export const receiveLanguages = (data: LanguagesState): LanguagesActionsTypes => ({
  type: LOAD_LANGUAGES_SUCCESS,
  data: {
    ...data,
    loading: false,
  },
});
