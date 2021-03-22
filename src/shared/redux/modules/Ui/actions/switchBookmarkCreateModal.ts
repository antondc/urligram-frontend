import { types, UiActions } from '../ui.types';

export const switchBookmarkCreateModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_BOOKMARK_CREATE_MODAL,
  payload: {
    bookmarkCreateModal: {
      mounted: mount,
    },
  },
});
