import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_LOGIN_MODAL, UiActionsTypes } from '../ui.types';

export const switchLoginModal = (mounted: boolean): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_LOGIN_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      loginModal: {
        ...Ui.loginModal,
        mounted,
      },
    },
  });
};
