import {
  LanguagesApiResponse,
  LanguagesApiResponseItem,
  LanguagesState,
  LanguageState,
} from 'Modules/Languages/languages.types';
import HttpClient from 'Services/HttpClient';
import { noop, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { getCurrentOrDefaultLanguage } from './utils/getCurrentOrDefaultLanguage';

export const initialLanguagesLoader = async (lang: string): Promise<{ Languages: LanguagesState }> => {
  try {
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
  } catch (error) {
    noop();
  }
};
