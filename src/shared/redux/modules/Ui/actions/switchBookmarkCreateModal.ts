import { Dispatch } from 'redux';

import { AppThunk } from '../../../index';
import { RootState } from '../../rootType';
import { SWITCH_BOOKMARK_CREATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkCreateModal = (mounted: boolean): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_BOOKMARK_CREATE_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      bookmarkCreateModal: {
        ...Ui.bookmarkCreateModal,
        mounted,
      },
    },
  });
};
