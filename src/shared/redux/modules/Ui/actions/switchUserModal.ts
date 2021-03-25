import { AppThunk } from '../../../index';
import { SWITCH_USER_MODAL, UiActionsTypes } from '../ui.types';

export const switchUserModal = (): AppThunk<void, UiActionsTypes> => async (dispatch, getState): Promise<void> => {
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
