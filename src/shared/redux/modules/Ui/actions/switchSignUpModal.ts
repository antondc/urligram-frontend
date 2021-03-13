import { SWITCH_SIGN_UP_MODAL, UiActionsTypes } from '../ui.types';

export const switchSignUpModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_SIGN_UP_MODAL,
});
