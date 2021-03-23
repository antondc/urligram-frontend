import { SWITCH_RESET_PASSWORD_MODAL, UiActionsTypes } from '../ui.types';

export const switchResetPasswordModal = (mount: boolean): UiActionsTypes => ({
  type: SWITCH_RESET_PASSWORD_MODAL,
  payload: {
    mounted: mount,
  },
});
