import { UiActions, USER_MODAL_UNMOUNT } from '../ui.types';

export const userModalUnmount = (): UiActions => ({
  type: USER_MODAL_UNMOUNT,
  payload: {
    userModal: {
      type: 'popup',
      mounted: false,
    },
  },
});
