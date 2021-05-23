import { AppThunk } from '../../../index';
import { SWITCH_LOGIN_MODAL, UiActions } from '../ui.types';

export const switchLoginModal = (mounted: boolean): AppThunk<void, UiActions> => async (
  dispatch,
  getState
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
