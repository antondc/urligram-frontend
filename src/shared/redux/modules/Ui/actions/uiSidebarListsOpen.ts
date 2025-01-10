import { UI_SIDEBAR_LISTS_OPEN, UiActions } from '../ui.types';

export const uiSidebarListsOpen = (): UiActions => ({
  type: UI_SIDEBAR_LISTS_OPEN,
  payload: {
    sidebarListsState: {
      open: true,
    },
  },
});
