import { AppThunk } from '../../../index';
import { initialState } from '../ui.reducer';
import { UI_CLOSE_ALL_MODALS, UiActions } from '../ui.types';

export const uiResetState = (): AppThunk<void, UiActions> => async (dispatch, getState): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: UI_CLOSE_ALL_MODALS,
    payload: {
      ...Ui,
      ...initialState,
    },
  });
};
