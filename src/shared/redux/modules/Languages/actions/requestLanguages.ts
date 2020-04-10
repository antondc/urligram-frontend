import { LOAD_LANGUAGES_STARTED, LanguagesActionsTypes } from 'Modules/Languages/languages.types';

export const requestLanguages = (): LanguagesActionsTypes => {
  return {
    type: LOAD_LANGUAGES_STARTED,
    data: {
      loading: true,
    },
  };
};
