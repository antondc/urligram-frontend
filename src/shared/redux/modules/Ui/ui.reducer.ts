import { UiState, SWITCH_USER_MODAL, SWITCH_MESSAGE_MODAL, SWITCH_LOGIN_MODAL, UNMOUNT_ALL_MODALS } from './ui.types';
import value from '*.svg';

const initialState: UiState = {
  userModal: {
    mounted: false,
  },
  messageModal: {
    mounted: false,
  },
  loginModal: {
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
    case SWITCH_LOGIN_MODAL:
      return Object.assign({}, state, {
        loginModal: {
          mounted: !state.loginModal.mounted,
        },
      });
    case UNMOUNT_ALL_MODALS:
      return Object.assign(
        {},
        state,
        Object.entries(state).reduce((acc, [key, value]) => ({ ...acc, [key]: { ...value, mounted: false } }), {})
      );

    default:
      return Object.assign({}, state);
  }
};
