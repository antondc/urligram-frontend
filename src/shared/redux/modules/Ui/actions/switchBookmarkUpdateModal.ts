import { types, UiActions } from '../ui.types';

export const switchBookmarkUpdateModal = ({
  mount,
  bookmarkId,
}: {
  mount: boolean;
  bookmarkId?: number;
}): UiActions => ({
  payload: {
    mounted: mount,
    bookmarkId,
  },
  type: types.SWITCH_BOOKMARK_UPDATE_MODAL,
});
