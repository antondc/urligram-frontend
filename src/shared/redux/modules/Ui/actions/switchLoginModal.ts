import { AppThunk } from '../../../index';
import { SWITCH_LOGIN_MODAL, UiActionsTypes } from '../ui.types';

export const switchLoginModal = (mounted: boolean): AppThunk<void, UiActionsTypes> => async (
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
