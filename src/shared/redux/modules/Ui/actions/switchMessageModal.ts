import { AppThunk } from '../../../index';
import { SWITCH_MESSAGE_MODAL, UiActions } from '../ui.types';

export const switchMessageModal = (): AppThunk<void, UiActions> => async (dispatch, getState): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_MESSAGE_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      messageModal: {
        ...Ui.messageModal,
        mounted: !Ui.messageModal.mounted,
      },
    },
  });
};
