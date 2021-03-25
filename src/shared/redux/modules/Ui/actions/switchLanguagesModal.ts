import { AppThunk } from '../../../index';
import { SWITCH_LANGUAGES_MODAL, UiActions } from '../ui.types';

export const switchLanguagesModal = (): AppThunk<void, UiActions> => async (dispatch, getState): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_LANGUAGES_MODAL,
    payload: {
      languagesModal: {
        ...Ui.languagesModal,
        mounted: !Ui.languagesModal.mounted,
      },
    },
  });
};
