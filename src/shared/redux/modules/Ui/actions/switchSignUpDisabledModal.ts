import { AppThunk } from '../../../index';
import { SWITCH_SIGN_UP_DISABLED_MODAL, UiActions } from '../ui.types';

export const switchSignUpDisabledModal =
  (mounted: boolean): AppThunk<void, UiActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Ui } = getState();

    dispatch({
      type: SWITCH_SIGN_UP_DISABLED_MODAL,
      payload: {
        ...Ui,
        screenLocked: !Ui.screenLocked,
        signUpDisabledModal: {
          ...Ui.signUpDisabledModal,
          mounted,
        },
      },
    });
  };
