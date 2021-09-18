import { AppThunk } from '../../..';
import {
  LANGUAGES_SWITCH_CURRENT_REQUEST,
  LANGUAGES_SWITCH_CURRENT_SUCCESS,
  LanguagesActions,
} from '../languages.types';

export const switchCurrentLanguage =
  (slug: string): AppThunk<void, LanguagesActions> =>
  (dispatch, getState): void => {
    const { Languages } = getState();

    if (Languages.currentLanguage.slug !== slug) {
      const newCurrentLanguage = Languages.byKey[slug];

      dispatch({
        type: LANGUAGES_SWITCH_CURRENT_REQUEST,
        payload: {
          ...Languages,
          currentLanguage: {
            ...Languages.currentLanguage,
            loading: true,
          },
        },
      });

      // Timeout due to language loading faster than page reload
      // TODO: navigate here
      setTimeout(() => {
        dispatch({
          type: LANGUAGES_SWITCH_CURRENT_SUCCESS,
          payload: {
            ...Languages,
            currentLanguage: newCurrentLanguage,
          },
        });
      }, 150);
    }
  };
