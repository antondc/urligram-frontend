import { SWITCH_BOOKMARK_UPDATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkUpdateModal = ({
  mount,
  bookmarkId,
}: {
  mount: boolean;
  bookmarkId?: number;
}): UiActionsTypes => ({
  type: SWITCH_BOOKMARK_UPDATE_MODAL,
  payload: {
    mounted: mount,
    bookmarkId,
  },
});
