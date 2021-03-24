import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../../index';
import { SWITCH_SIGN_UP_MODAL, UiActionsTypes } from '../ui.types';

export const switchSignUpModal = (mounted: boolean): AppThunk<void> => async (
  dispatch: Dispatch<UiActionsTypes>,
  getState: () => RootState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_SIGN_UP_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      signUpModal: {
        ...Ui.signUpModal,
        mounted,
      },
    },
  });
};
