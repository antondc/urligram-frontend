import { SWITCH_FORGOT_PASSWORD_MODAL, UiActionsTypes } from '../ui.types';

export const switchForgotPasswordModal = (mount: boolean): UiActionsTypes => ({
  payload: {
    mounted: mount,
  },
  type: SWITCH_FORGOT_PASSWORD_MODAL,
});
