import { AppThunk } from '../../../index';
import { SWITCH_USER_MODAL, UiActions } from '../ui.types';

export const switchUserModal = (): AppThunk<void, UiActions> => async (dispatch, getState): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_USER_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      userModal: {
        ...Ui.userModal,
        mounted: !Ui.userModal.mounted,
      },
    },
  });
};
