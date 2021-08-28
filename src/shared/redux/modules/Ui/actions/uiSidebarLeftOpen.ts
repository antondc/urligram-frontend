import { UI_SIDEBAR_LEFT_OPEN, UiActions } from '../ui.types';

export const uiSidebarLeftOpen = (): UiActions => ({
  type: UI_SIDEBAR_LEFT_OPEN,
  payload: {
    sidebarLeftState: {
      closed: false,
    },
  },
});
