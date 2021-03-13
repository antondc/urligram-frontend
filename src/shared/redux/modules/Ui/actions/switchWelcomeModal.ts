import { SWITCH_WELCOME_MODAL, UiActionsTypes } from '../ui.types';

export const switchWelcomeModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_WELCOME_MODAL,
});
