import { types, UiActions } from '../ui.types';

export const switchUserModal = (): UiActions => ({
  type: types.SWITCH_USER_MODAL,
  payload: undefined,
});
