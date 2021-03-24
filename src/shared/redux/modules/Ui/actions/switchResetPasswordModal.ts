import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_RESET_PASSWORD_MODAL, UiActionsTypes } from '../ui.types';

export const switchResetPasswordModal = (mounted: boolean): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_RESET_PASSWORD_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      resetPasswordModal: {
        ...Ui.resetPasswordModal,
        mounted,
      },
    },
  });
};
