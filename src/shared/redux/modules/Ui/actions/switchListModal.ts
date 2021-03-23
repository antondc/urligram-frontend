import { SWITCH_LIST_MODAL, UiActionsTypes } from '../ui.types';

export const switchListModal = (mount: boolean): UiActionsTypes => ({
  type: SWITCH_LIST_MODAL,
  payload: {
    mounted: mount,
  },
});
