import { Dispatch } from 'redux';
import { switchCurrentLanguageRequest } from './switchCurrentLanguageRequest';
import { switchCurrentLanguageReceive } from './switchCurrentLanguageReceive';

export const switchCurrentLanguage = (slug: string) => {
  return (dispatch: Dispatch, getState) => {
    const {
      Languages: { byKey, currentLanguage },
    } = getState();

    if (currentLanguage.slug !== slug) {
      const newCurrentLanguage = byKey[slug];
      dispatch(switchCurrentLanguageRequest());
      dispatch(switchCurrentLanguageReceive(newCurrentLanguage));
    }
  };
};
