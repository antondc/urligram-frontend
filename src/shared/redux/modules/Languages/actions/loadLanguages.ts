import { Dispatch } from 'redux';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';
import languages from 'Modules/Languages/languages.data.json';
import { LanguagesApiResponse } from 'Modules/Languages/languages.types';

export const loadLanguages = (lang: string) => {
  if (isBrowser) {
    return (dispatch: Dispatch) => {
      const response: LanguagesApiResponse = languages;
      languages.data.Languages.currentLanguage = languages.data.Languages.byKey[lang];

      dispatch(requestLanguages());
      dispatch(receiveLanguages(response.data.Languages));
    };
  }
  const response: LanguagesApiResponse = languages;
  languages.data.Languages.currentLanguage = languages.data.Languages.byKey[lang];

  return response.data;
};
