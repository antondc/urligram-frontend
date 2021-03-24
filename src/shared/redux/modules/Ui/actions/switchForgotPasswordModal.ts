import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_FORGOT_PASSWORD_MODAL, UiActionsTypes } from '../ui.types';

export const switchForgotPasswordModal = (mounted: boolean): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_FORGOT_PASSWORD_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      forgotPasswordModal: {
        ...Ui.forgotPasswordModal,
        mounted,
      },
    },
  });
};
