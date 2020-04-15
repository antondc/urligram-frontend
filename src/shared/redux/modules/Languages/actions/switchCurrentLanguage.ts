import { Dispatch } from 'redux';
import { switchCurrentLanguageRequest } from './switchCurrentLanguageRequest';
import { switchCurrentLanguageReceive } from './switchCurrentLanguageReceive';

export const switchCurrentLanguage = (slug: string) => {
  return (dispatch: Dispatch, getState) => {
    const {
      Languages: { byKey, currentLanguage },
    } = getState();

    // Mock async action to provide some output to user
    if (currentLanguage.slug !== slug) {
      const newCurrentLanguage = byKey[slug];
      dispatch(switchCurrentLanguageRequest());
      setTimeout(() => {
        dispatch(switchCurrentLanguageReceive(newCurrentLanguage));
      }, 300);
    }
  };
};
