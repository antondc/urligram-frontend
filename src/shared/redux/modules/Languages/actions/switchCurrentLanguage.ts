import { Dispatch } from 'redux';
import { switchCurrentLanguageRequest } from './switchCurrentLanguageRequest';
import { switchCurrentLanguageReceive } from './switchCurrentLanguageReceive';

export const switchCurrentLanguage = (slug: string) => (dispatch: Dispatch, getState) => {
  const {
    Languages: { byKey, currentLanguage },
  } = getState();

  if (currentLanguage.slug !== slug) {
    const newCurrentLanguage = byKey[slug];
    dispatch(switchCurrentLanguageRequest());
    // Timeout due to language loading faster than page reload
    // TODO: navigate here
    setTimeout(() => {
      dispatch(switchCurrentLanguageReceive(newCurrentLanguage));
    }, 300);
  }
};
