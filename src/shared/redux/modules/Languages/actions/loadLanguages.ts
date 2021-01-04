import { Dispatch } from 'redux';

import { LanguagesApiResponse, LanguagesState } from 'Modules/Languages/languages.types';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { getCurrentOrDefaultLanguage } from '../utils/getCurrentOrDefaultLanguage';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';

const languagesSerializerByKey = (data) =>
  data.reduce((acc, curr) => ({ ...acc, ...{ [curr.attributes.slug]: curr.attributes } }), {});

export const loadLanguages = (lang: string) => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    const { data } = await HttpClient.get<LanguagesApiResponse>('/languages');

    const languagesByKey: LanguagesState = {
      byKey: languagesSerializerByKey(data),
    };
    const currentLanguage = getCurrentOrDefaultLanguage(languagesByKey, lang);

    const Languages = {
      ...languagesByKey,
      currentLanguage,
    };

    dispatch(requestLanguages());
    dispatch(receiveLanguages(Languages));

    return;
  }

  const { data } = await HttpClient.get<LanguagesApiResponse>('/languages');

  const languagesByKey: LanguagesState = {
    byKey: languagesSerializerByKey(data),
  };

  const currentLanguage = getCurrentOrDefaultLanguage(languagesByKey, lang);

  const result = {
    Languages: {
      ...languagesByKey,
      currentLanguage,
    },
  };

  return result;
};
