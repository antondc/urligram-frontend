import { uiScreenDesktopLock } from 'Modules/Ui/actions/uiScreenDesktopLock';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { AppThunk } from '../../../index';
import { UI_BOOKMARK_LISTS_MODALS_MOUNT, UiActions } from '../ui.types';

interface Props {
  bookmarkId: number;
}

export const bookmarkListsModalMount =
  ({ bookmarkId }: Props): AppThunk<void, UiActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Ui } = getState();

    dispatch(uiScreenDesktopLock());
    dispatch(uiScreenMobileLock());

    dispatch({
      type: UI_BOOKMARK_LISTS_MODALS_MOUNT,
      payload: {
        bookmarkListsModal: {
          ...Ui.bookmarkListsModal,
          type: 'popup',
          mounted: true,
          bookmarkId,
        },
      },
    });
  };
