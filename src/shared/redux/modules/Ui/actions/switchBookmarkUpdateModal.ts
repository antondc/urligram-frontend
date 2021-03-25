import { AppThunk } from '../../../index';
import { SWITCH_BOOKMARK_UPDATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkUpdateModal = ({
  mounted,
  bookmarkId,
}: {
  mounted: boolean;
  bookmarkId?: number;
}): AppThunk<void, UiActionsTypes> => async (dispatch, getState): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_BOOKMARK_UPDATE_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      bookmarkUpdateModal: {
        ...Ui.bookmarkUpdateModal,
        mounted,
        bookmarkId,
      },
    },
  });
};
