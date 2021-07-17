import { UI_SCREEN_MOBILE_UNLOCK, UiActions } from '../ui.types';

export const uiScreenMobileUnLock = (): UiActions => ({
  type: UI_SCREEN_MOBILE_UNLOCK,
  payload: {
    screenMobileLocked: false,
  },
});
