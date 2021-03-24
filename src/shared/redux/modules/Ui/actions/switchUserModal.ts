import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_USER_MODAL, UiActionsTypes } from '../ui.types';

export const switchUserModal = (): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
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
