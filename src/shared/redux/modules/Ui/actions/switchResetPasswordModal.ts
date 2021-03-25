import { AppThunk } from '../../../index';
import { SWITCH_RESET_PASSWORD_MODAL, UiActions } from '../ui.types';

export const switchResetPasswordModal = (mounted: boolean): AppThunk<void, UiActions> => async (
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
