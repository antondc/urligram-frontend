import { ScreenType, UI_SCREEN_MOBILE_LOCK, UiActions } from '../ui.types';

export const uiScreenTypeSet = (screenType: ScreenType): UiActions => ({
  type: UI_SCREEN_MOBILE_LOCK,
  payload: {
    screenType,
  },
});
