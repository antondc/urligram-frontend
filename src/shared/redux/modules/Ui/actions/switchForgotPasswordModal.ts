import { types, UiActions } from '../ui.types';

export const switchForgotPasswordModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_FORGOT_PASSWORD_MODAL,
  payload: {
    mounted: mount,
  },
});
