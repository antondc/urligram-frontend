import { AppThunk } from '../../../index';
import { UI_BOOKMARK_LISTS_MODALS_MOUNT, UiActions } from '../ui.types';

interface Props {
  bookmarkId: number;
}

export const bookmarkSendModalMount = ({ bookmarkId }: Props): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();
  dispatch({
    type: UI_BOOKMARK_LISTS_MODALS_MOUNT,
    payload: {
      bookmarkSendModals: [
        ...Ui.bookmarkSendModals,
        {
          type: 'popup',
          mounted: true,
          bookmarkId,
        },
      ],
    },
  });
};
