import { UI_SCREEN_LOCK, UiActions } from '../ui.types';

export const uiScreenLock = (): UiActions => ({
  type: UI_SCREEN_LOCK,
  payload: {
    screenLocked: true,
  },
});
