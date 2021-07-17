import { UI_SCREEN_MOBILE_LOCK, UiActions } from '../ui.types';

export const uiScreenMobileLock = (): UiActions => ({
  type: UI_SCREEN_MOBILE_LOCK,
  payload: {
    screenMobileLocked: true,
  },
});
