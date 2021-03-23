import { SWITCH_SIGN_UP_MODAL, UiActionsTypes } from '../ui.types';

export const switchSignUpModal = (mount: boolean): UiActionsTypes => ({
  type: SWITCH_SIGN_UP_MODAL,
  payload: {
    mounted: mount,
  },
});
