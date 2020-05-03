import { SWITCH_MESSAGE_MODAL, UiActionsTypes } from '../ui.types';

export const switchMessageModal = (): UiActionsTypes => {
  return {
    type: SWITCH_MESSAGE_MODAL,
  };
};
