import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { switchCurrentLanguageReceive } from './switchCurrentLanguageReceive';
import { switchCurrentLanguageRequest } from './switchCurrentLanguageRequest';

export const switchCurrentLanguage = (slug: string) => (dispatch: Dispatch, getState: () => RootState): void => {
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
    }, 150);
  }
};
