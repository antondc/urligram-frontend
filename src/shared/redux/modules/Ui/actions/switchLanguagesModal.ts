import { SWITCH_LANGUAGES_MODAL, UiActionsTypes } from '../ui.types';

export const switchLanguagesModal = (): UiActionsTypes => {
  return {
    type: SWITCH_LANGUAGES_MODAL,
  };
};
