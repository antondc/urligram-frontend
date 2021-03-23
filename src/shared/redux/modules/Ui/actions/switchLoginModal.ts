import { SWITCH_LOGIN_MODAL, UiActionsTypes } from '../ui.types';

export const switchLoginModal = (mount: boolean): UiActionsTypes => ({
  type: SWITCH_LOGIN_MODAL,
  payload: {
    mounted: mount,
  },
});
