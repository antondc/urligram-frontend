import { types, UiActions } from '../ui.types';

export const switchResetPasswordModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_RESET_PASSWORD_MODAL,
  payload: {
    mounted: mount,
  },
});
