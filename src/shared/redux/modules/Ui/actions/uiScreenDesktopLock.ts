import { UI_SCREEN_DESKTOP_LOCK, UiActions } from '../ui.types';

export const uiScreenDesktopLock = (): UiActions => ({
  type: UI_SCREEN_DESKTOP_LOCK,
  payload: {
    screenLocked: true,
  },
});
