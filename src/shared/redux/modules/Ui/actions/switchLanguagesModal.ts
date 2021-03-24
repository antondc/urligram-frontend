import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_LANGUAGES_MODAL, UiActionsTypes } from '../ui.types';

export const switchLanguagesModal = (): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_LANGUAGES_MODAL,
    payload: {
      languagesModal: {
        ...Ui.languagesModal,
        mounted: !Ui.languagesModal.mounted,
      },
    },
  });
};
