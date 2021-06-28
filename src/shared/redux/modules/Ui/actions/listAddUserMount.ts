import { AppThunk } from '../../../index';
import { SWITCH_LIST_ADD_USER_MODAL, UiActions } from '../ui.types';

export const listAddUserMount = (): AppThunk<void, UiActions> => async (dispatch, getState): Promise<void> => {
  const { Ui } = getState();
  dispatch({
    type: SWITCH_LIST_ADD_USER_MODAL,
    payload: {
      ...Ui,
      listAddUserModal: {
        mounted: true,
        type: 'popup',
      },
    },
  });
};
