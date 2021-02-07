import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  LanguagesApiResponse,
  LanguagesApiResponseItem,
  LanguagesState,
  LanguageState,
} from 'Modules/Languages/languages.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { getCurrentOrDefaultLanguage } from '../utils/getCurrentOrDefaultLanguage';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';

export const loadLanguages = (lang: string): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(requestLanguages());

    const { data }: LanguagesApiResponse = await HttpClient.get('/languages');

    const languagesByKey: LanguagesState = {
      byKey: serializerFromArrayToByKey<LanguagesApiResponseItem, LanguageState>({
        data,
        contentPath: 'attributes',
        keyPath: 'attributes.slug',
      }),
    };
    const currentLanguage = getCurrentOrDefaultLanguage(languagesByKey, lang);

    const Languages = {
      ...languagesByKey,
      currentLanguage,
    };

    dispatch(receiveLanguages(Languages));
  } catch (err) {
    throw new Error(err);
  }
};
