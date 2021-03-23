import { SWITCH_WELCOME_MODAL, UiActionsTypes } from '../ui.types';

export const switchWelcomeModal = (mount: boolean): UiActionsTypes => ({
  type: SWITCH_WELCOME_MODAL,
  payload: {
    mounted: mount,
  },
});
