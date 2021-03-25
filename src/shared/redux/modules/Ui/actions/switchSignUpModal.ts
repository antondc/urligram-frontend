import { AppThunk } from '../../../index';
import { SWITCH_SIGN_UP_MODAL, UiActions } from '../ui.types';

export const switchSignUpModal = (mounted: boolean): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_SIGN_UP_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      signUpModal: {
        ...Ui.signUpModal,
        mounted,
      },
    },
  });
};
