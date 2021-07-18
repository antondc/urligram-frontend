import { AppThunk } from '../../../index';
import { UI_BOOKMARK_LISTS_MODALS_MOUNT, UiActions } from '../ui.types';

interface Props {
  loading: boolean;
}

export const bookmarkListsModalLoading =
  ({ loading }: Props): AppThunk<void, UiActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Ui } = getState();

    dispatch({
      type: UI_BOOKMARK_LISTS_MODALS_MOUNT,
      payload: {
        bookmarkListsModal: {
          ...Ui.bookmarkListsModal,
          type: 'popup',
          mounted: true,
          loading,
        },
      },
    });
  };
