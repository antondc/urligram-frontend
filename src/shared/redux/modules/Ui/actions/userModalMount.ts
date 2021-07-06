import { UiActions, USER_MODAL_MOUNT } from '../ui.types';

export const userModalMount = (): UiActions => ({
  type: USER_MODAL_MOUNT,
  payload: {
    userModal: {
      type: 'popup',
      mounted: true,
    },
  },
});
