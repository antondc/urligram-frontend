import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../..';
import { switchCurrentLanguageReceive } from './switchCurrentLanguageReceive';
import { switchCurrentLanguageRequest } from './switchCurrentLanguageRequest';

export const switchCurrentLanguage = (slug: string): AppThunk<void> => (
  dispatch: Dispatch,
  getState: () => RootState
): void => {
  const { Languages } = getState();

  if (Languages.currentLanguage.slug !== slug) {
    const newCurrentLanguage = Languages.byKey[slug];

    dispatch(
      switchCurrentLanguageRequest({
        ...Languages,
        currentLanguage: {
          ...Languages.currentLanguage,
          loading: true,
        },
      })
    );

    // Timeout due to language loading faster than page reload
    // TODO: navigate here
    setTimeout(() => {
      dispatch(
        switchCurrentLanguageReceive({
          ...Languages,
          currentLanguage: newCurrentLanguage,
        })
      );
    }, 150);
  }
};
