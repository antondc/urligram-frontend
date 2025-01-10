import { UI_SIDEBAR_LISTS_CLOSE, UiActions } from '../ui.types';

export const uiSidebarListsClose = (): UiActions => ({
  type: UI_SIDEBAR_LISTS_CLOSE,
  payload: {
    sidebarListsState: {
      open: false,
    },
  },
});
