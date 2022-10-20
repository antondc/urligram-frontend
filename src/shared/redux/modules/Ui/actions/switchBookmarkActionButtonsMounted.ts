import { UI_SWITCH_BOOKMARK_ICONS_MOUNTED, UiActions } from '../ui.types';

export const switchBookmarkActionButtonsMounted = ({ bookmarkId }: { bookmarkId: number }): UiActions => ({
  type: UI_SWITCH_BOOKMARK_ICONS_MOUNTED,
  payload: {
    bookmarkActionsIcons: {
      type: 'slider',
      mounted: true,
      bookmarkId,
    },
  },
});
