import { types, UiActions } from '../ui.types';

export const switchBookmarkUpdateModal = ({
  mount,
  bookmarkId,
}: {
  mount: boolean;
  bookmarkId?: number;
}): UiActions => ({
  type: types.SWITCH_BOOKMARK_UPDATE_MODAL,
  payload: {
    bookmarkUpdateModal: {
      mounted: mount,
      bookmarkId,
    },
  },
});
