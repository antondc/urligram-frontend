import { LOAD_LANGUAGES_SUCCESS, LanguagesActionsTypes, LanguagesState } from '../languages.types';

export const receiveLanguages = (data: LanguagesState): LanguagesActionsTypes => {
  return {
    type: LOAD_LANGUAGES_SUCCESS,
    data: {
      ...data,
      loading: false,
    },
  };
};
