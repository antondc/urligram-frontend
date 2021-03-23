import { SWITCH_BOOKMARK_UPDATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkUpdateModal = ({
  mount,
  bookmarkId,
}: {
  mount: boolean;
  bookmarkId?: number;
}): UiActionsTypes => ({
  data: {
    mounted: mount,
    bookmarkId,
  },
  type: SWITCH_BOOKMARK_UPDATE_MODAL,
});
