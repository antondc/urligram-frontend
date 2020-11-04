import { Dispatch } from 'redux';

import languages from 'Modules/Languages/languages.data.json';
import { LanguagesApiResponse } from 'Modules/Languages/languages.types';
import { getCurrentOrDefaultLanguage } from '../utils/getCurrentOrDefaultLanguage';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';

export const loadLanguages = (lang: string) => (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response: LanguagesApiResponse = languages;
    const currentOrDefaultLanguage = getCurrentOrDefaultLanguage(languages.data.Languages, lang);
    languages.data.Languages.currentLanguage = currentOrDefaultLanguage;

    dispatch(requestLanguages());
    dispatch(receiveLanguages(response.data.Languages));

    return;
  }

  const response: LanguagesApiResponse = languages;
  const currentOrDefaultLanguage = getCurrentOrDefaultLanguage(languages.data.Languages, lang);
  languages.data.Languages.currentLanguage = currentOrDefaultLanguage;

  return response.data;
};
