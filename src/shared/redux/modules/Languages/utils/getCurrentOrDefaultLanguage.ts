import { LanguagesState, LanguageState } from '../languages.types';

export const getCurrentOrDefaultLanguage = (languages: LanguagesState, lang: string): LanguageState => {
  const currentLanguage = lang
    ? languages.byKey[lang]
    : Object.values(languages.byKey).find((item: LanguageState) => item.isDefault);

  return currentLanguage;
};
