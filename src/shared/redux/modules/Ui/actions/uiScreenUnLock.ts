import { UI_SCREEN_UNLOCK, UiActions } from '../ui.types';

export const uiScreenUnLock = (): UiActions => ({
  type: UI_SCREEN_UNLOCK,
  payload: {
    screenLocked: false,
  },
});
