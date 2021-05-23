import { AppThunk } from '../../../index';
import { SWITCH_FORGOT_PASSWORD_MODAL, UiActions } from '../ui.types';

export const switchForgotPasswordModal = (mounted: boolean): AppThunk<void, UiActions> => async (
  dispatch,
  getState
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
