import { AppThunk } from '../../../index';
import { SWITCH_WELCOME_MODAL_ERROR, UiActions } from '../ui.types';

export const switchWelcomeModalError =
  (mounted: boolean): AppThunk<void, UiActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Ui } = getState();

    dispatch({
      type: SWITCH_WELCOME_MODAL_ERROR,
      payload: {
        screenLocked: !Ui.screenLocked,
        welcomeModalError: {
          ...Ui.welcomeModalError,
          mounted,
        },
      },
    });
  };
