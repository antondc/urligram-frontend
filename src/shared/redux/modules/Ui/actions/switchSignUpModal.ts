import { types, UiActions } from '../ui.types';

export const switchSignUpModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_SIGN_UP_MODAL,
  payload: {
    signUpModal: {
      mounted: mount,
    },
  },
});
