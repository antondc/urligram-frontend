import { AppThunk } from '../../../index';
import { SWITCH_WELCOME_MODAL, UiActions } from '../ui.types';

export const switchWelcomeModal = (mounted: boolean): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_WELCOME_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      welcomeModal: {
        ...Ui.welcomeModal,
        mounted,
      },
    },
  });
};
