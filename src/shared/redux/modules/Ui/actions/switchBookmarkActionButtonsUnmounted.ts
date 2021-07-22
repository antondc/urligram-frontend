import { UI_SWITCH_BOOKMARK_ICONS_UNMOUNTED, UiActions } from '../ui.types';

export const switchBookmarkActionButtonsUnmounted = (): UiActions => ({
  type: UI_SWITCH_BOOKMARK_ICONS_UNMOUNTED,
  payload: {
    bookmarkActionsIcons: {
      type: 'slider',
      mounted: false,
      bookmarkId: undefined,
    },
  },
});
