import { SWITCH_BOOKMARK_CREATE_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkCreateModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_BOOKMARK_CREATE_MODAL,
});
