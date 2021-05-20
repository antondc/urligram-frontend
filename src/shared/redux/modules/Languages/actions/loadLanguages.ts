import {
  LanguagesActions,
  LanguagesApiResponse,
  LanguagesState,
  LanguageState,
} from 'Modules/Languages/languages.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { getCurrentOrDefaultLanguage } from '../utils/getCurrentOrDefaultLanguage';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';

export const loadLanguages = (lang: string): AppThunk<Promise<LanguageState[]>, LanguagesActions> => async (
  dispatch,
  getsState
): Promise<LanguageState[]> => {
  const { Languages } = getsState();
  try {
    dispatch(
      requestLanguages({
        ...Languages,
        currentLanguage: {
          ...Languages.currentLanguage,
          loading: true,
        },
      })
    );

    const { data } = await HttpClient.get<void, LanguagesApiResponse>('/languages');

    const languagesArray = data?.map((item) => item?.attributes);

    const languagesByKey: LanguagesState = {
      byKey: serializerFromArrayToByKey<LanguageState, LanguageState>({
        data: languagesArray,
        keyPath: 'attributes.slug',
      }),
    };
    const currentLanguage = getCurrentOrDefaultLanguage(languagesByKey, lang);

    dispatch(
      receiveLanguages({
        ...languagesByKey,
        currentLanguage,
      })
    );

    return languagesArray;
  } catch (err) {
    throw new Error(err);
  }
};
