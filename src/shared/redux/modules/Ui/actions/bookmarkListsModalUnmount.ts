import { uiScreenDesktopUnlock } from 'Modules/Ui/actions/uiScreenDesktopUnlock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { AppThunk } from '../../../index';
import { UI_BOOKMARK_LISTS_MODALS_UNMOUNT, UiActions } from '../ui.types';

export const bookmarkListsModalUnmount =
  (): AppThunk<void, UiActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Ui } = getState();

    dispatch(uiScreenDesktopUnlock());
    dispatch(uiScreenMobileUnLock());

    dispatch({
      type: UI_BOOKMARK_LISTS_MODALS_UNMOUNT,
      payload: {
        bookmarkListsModal: {
          ...Ui.bookmarkListsModal,
          type: 'modal',
          mounted: false,
          bookmarkId: undefined,
        },
      },
    });
  };
