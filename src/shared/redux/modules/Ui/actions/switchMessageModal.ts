import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_MESSAGE_MODAL, UiActionsTypes } from '../ui.types';

export const switchMessageModal = (): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
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
