import { AppThunk } from '../../../index';
import { initialState } from '../ui.reducer';
import { UI_CLOSE_ALL_MODALS, UiActions } from '../ui.types';

export const uiResetModalsState =
  (): AppThunk<void, UiActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Ui } = getState();

    // Get only the initial state of the keys with `type: "modal"` or `type: "popup"` to reset them
    const uiInitialStateArray = Object.entries(initialState) as [key: string, value: { type: string }][];
    const uiInitialStateOnlyModals = uiInitialStateArray
      .filter(([, value]) => value?.type === 'modal' || value?.type === 'popup')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    dispatch({
      type: UI_CLOSE_ALL_MODALS,
      payload: {
        ...Ui,
        screenMobileLocked: false,
        screenLocked: false,
        ...uiInitialStateOnlyModals,
      },
    });
  };
