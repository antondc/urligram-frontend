import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_BOOKMARK_UPDATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkUpdateModal = ({
  mounted,
  bookmarkId,
}: {
  mounted: boolean;
  bookmarkId?: number;
}): AppThunk<void> => async (dispatch: Dispatch<UiActionsTypes>, getState: () => RootState): Promise<void> => {
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
