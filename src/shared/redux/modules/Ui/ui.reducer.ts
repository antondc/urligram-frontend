import { UiState, SWITCH_USER_MODAL, SWITCH_MESSAGE_MODAL } from './ui.types';

const initialState: UiState = {
  userModal: {
    mounted: false,
  },
  messageModal: {
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
    case SWITCH_MESSAGE_MODAL:
      return Object.assign({}, state, {
        messageModal: {
          mounted: !state.messageModal.mounted,
        },
      });

    default:
      return Object.assign({}, state);
  }
};
