import { SWITCH_RESET_PASSWORD_MODAL, UiActionsTypes } from '../ui.types';

export const switchResetPasswordModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_RESET_PASSWORD_MODAL,
});
