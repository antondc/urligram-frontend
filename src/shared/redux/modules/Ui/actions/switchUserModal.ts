import { SWITCH_USER_MODAL, UiActionsTypes } from '../ui.types';

export const switchUserModal = (): UiActionsTypes => {
  return {
    type: SWITCH_USER_MODAL,
  };
};
