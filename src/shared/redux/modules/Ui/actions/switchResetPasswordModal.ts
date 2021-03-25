import { AppThunk } from '../../../index';
import { SWITCH_RESET_PASSWORD_MODAL, UiActionsTypes } from '../ui.types';

export const switchResetPasswordModal = (mounted: boolean): AppThunk<void, UiActionsTypes> => async (
  dispatch,
  getState
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
