import { UI_SIDEBAR_LEFT_CLOSE, UiActions } from '../ui.types';

export const uiSidebarLeftClose = (): UiActions => ({
  type: UI_SIDEBAR_LEFT_CLOSE,
  payload: {
    sidebarLeftState: {
      closed: true,
    },
  },
});
