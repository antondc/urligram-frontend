import { ScreenType, UI_SCREEN_MOBILE_LOCK, UiActions } from '../ui.types';

type UiScreenType = (screenType: ScreenType) => UiActions;

export const uiScreenTypeSet: UiScreenType = (screenType) => ({
  type: UI_SCREEN_MOBILE_LOCK,
  payload: {
    screenType,
  },
});
