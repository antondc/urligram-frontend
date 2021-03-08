import { SWITCH_LOGIN_MODAL, UiActionsTypes } from '../ui.types';

export const switchLoginModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_LOGIN_MODAL,
});
