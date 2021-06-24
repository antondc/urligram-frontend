import { AppThunk } from '../../../index';
import { UI_BOOKMARK_LISTS_MODALS_UNMOUNT, UiActions } from '../ui.types';

interface Props {
  bookmarkId: number;
}

export const bookmarkSendModalUnmount = ({ bookmarkId }: Props): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();

  const filteredBookmarkListModals = Ui.bookmarkSendModals?.filter((item) => item?.bookmarkId !== bookmarkId);

  dispatch({
    type: UI_BOOKMARK_LISTS_MODALS_UNMOUNT,
    payload: {
      bookmarkSendModals: filteredBookmarkListModals,
    },
  });
};
