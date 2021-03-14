import { SWITCH_BOOKMARK_MODAL, UiActionsTypes } from '../ui.types';

export const switchBookmarkModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_BOOKMARK_MODAL,
});
