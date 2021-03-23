import { SWITCH_LIST_MODAL, UiActionsTypes } from '../ui.types';

export const switchListModal = (mount: boolean): UiActionsTypes => ({
  data: {
    mounted: mount,
  },
  type: SWITCH_LIST_MODAL,
});
