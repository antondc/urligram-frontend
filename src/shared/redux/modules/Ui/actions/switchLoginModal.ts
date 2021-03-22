import { types, UiActions } from '../ui.types';

export const switchLoginModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_LOGIN_MODAL,
  payload: {
    mounted: mount,
  },
});
