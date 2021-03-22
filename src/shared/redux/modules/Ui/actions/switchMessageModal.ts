import { types, UiActions } from '../ui.types';

export const switchMessageModal = (): UiActions => ({
  type: types.SWITCH_MESSAGE_MODAL,
  payload: undefined,
});
