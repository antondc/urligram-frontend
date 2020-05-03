import { SWITCH_LOGIN_MODAL, UiActionsTypes } from '../ui.types';

export const switchLoginModal = (): UiActionsTypes => {
  return {
    type: SWITCH_LOGIN_MODAL,
  };
};
