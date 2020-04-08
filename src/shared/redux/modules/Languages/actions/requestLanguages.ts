import { LOAD_LANGUAGES_STARTED, LanguagesActionsTypes } from '../languages.types';

export const requestLanguages = (): LanguagesActionsTypes => {
  return {
    type: LOAD_LANGUAGES_STARTED,
    data: {
      loading: true,
    },
  };
};
