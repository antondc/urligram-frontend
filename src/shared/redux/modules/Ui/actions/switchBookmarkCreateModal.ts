import { SWITCH_BOOKMARK_CREATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkCreateModal = (mount: boolean): UiActionsTypes => ({
  type: SWITCH_BOOKMARK_CREATE_MODAL,
  payload: {
    mounted: mount,
  },
});
