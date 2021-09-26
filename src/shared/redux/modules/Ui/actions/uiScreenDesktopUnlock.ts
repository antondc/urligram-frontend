import { UI_SCREEN_DESKTOP_UNLOCK, UiActions } from '../ui.types';

export const uiScreenDesktopUnlock = (): UiActions => ({
  type: UI_SCREEN_DESKTOP_UNLOCK,
  payload: {
    screenLocked: false,
  },
});
