import { types, UiActions } from '../ui.types';

export const switchListModal = (mount: boolean): UiActions => ({
  type: types.SWITCH_LIST_MODAL,
  payload: {
    mounted: mount,
  },
});
