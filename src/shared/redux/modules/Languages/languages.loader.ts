import {
  LanguagesApiResponse,
  LanguagesApiResponseItem,
  LanguagesState,
  LanguageState,
} from 'Modules/Languages/languages.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { getCurrentOrDefaultLanguage } from './utils/getCurrentOrDefaultLanguage';

export const initialLanguagesLoader = async (lang: string): Promise<{ Languages: LanguagesState }> => {
  const { data }: LanguagesApiResponse = await HttpClient.get('/languages');

  const languagesByKey: LanguagesState = {
    byKey: serializerFromArrayToByKey<LanguagesApiResponseItem, LanguageState>({
      data,
      contentPath: 'attributes',
      keyPath: 'attributes.slug',
    }),
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
