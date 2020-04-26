import { UiState, SWITCH_USER_MODAL } from './ui.types';

const initialState: UiState = {
  userModal: {
    mounted: false,
  },
};

export const Ui = (state = initialState, action): UiState => {
  switch (action.type) {
    case SWITCH_USER_MODAL:
      return Object.assign({}, state, {
        userModal: {
          mounted: !state.userModal.mounted,
        },
      });

    default:
      return Object.assign({}, state);
  }
};
