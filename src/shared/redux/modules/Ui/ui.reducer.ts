import {
  SWITCH_LANGUAGES_MODAL,
  SWITCH_LOGIN_MODAL,
  SWITCH_MESSAGE_MODAL,
  SWITCH_USER_MODAL,
  UiState,
} from './ui.types';

const initialState: UiState = {
  screenLocked: false,
  userModal: {
    type: 'modal',
    mounted: false,
  },
  languagesModal: {
    type: 'modal',
    mounted: false,
  },
  messageModal: {
    type: 'popup',
    mounted: false,
  },
  loginModal: {
    type: 'popup',
    mounted: false,
  },
};

export const Ui = (state = initialState, action): UiState => {
  switch (action.type) {
    case SWITCH_USER_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        userModal: {
          ...state.userModal,
          mounted: !state.userModal.mounted,
        },
      });
    case SWITCH_LANGUAGES_MODAL:
      return Object.assign({}, state, {
        languagesModal: {
          ...state.languagesModal,
          mounted: !state.languagesModal.mounted,
        },
      });
    case SWITCH_MESSAGE_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        messageModal: {
          ...state.messageModal,
          mounted: !state.messageModal.mounted,
        },
      });
    case SWITCH_LOGIN_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        loginModal: {
          ...state.loginModal,
          mounted: !state.loginModal.mounted,
        },
      });

    default:
      return Object.assign({}, state);
  }
};
