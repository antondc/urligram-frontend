import { AppThunk } from '../../../index';
import { SWITCH_BOOKMARK_CREATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkCreateModal = (mounted: boolean): AppThunk<void, UiActionsTypes> => async (
  dispatch,
  getState
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
