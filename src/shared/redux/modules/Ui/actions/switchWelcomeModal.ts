import { types, UiActions } from '../ui.types';

export const switchWelcomeModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_WELCOME_MODAL,
  payload: {
    mounted: mount,
  },
});
