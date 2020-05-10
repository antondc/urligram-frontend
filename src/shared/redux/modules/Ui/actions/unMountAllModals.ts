import { UNMOUNT_ALL_MODALS, UiActionsTypes } from '../ui.types';

export const unMountAllModals = (): UiActionsTypes => {
  return {
    type: UNMOUNT_ALL_MODALS,
  };
};
