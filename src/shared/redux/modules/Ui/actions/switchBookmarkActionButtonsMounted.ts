import { UI_SWITCH_BOOKMARK_ICONS_MOUNTED, UiActions } from '../ui.types';

type SwitchBookmarkActionButtonsMounted = ({ bookmarkId: number }) => UiActions;

export const switchBookmarkActionButtonsMounted: SwitchBookmarkActionButtonsMounted = ({ bookmarkId }) => ({
  type: UI_SWITCH_BOOKMARK_ICONS_MOUNTED,
  payload: {
    bookmarkActionsIcons: {
      type: 'slider',
      mounted: true,
      bookmarkId,
    },
  },
});
