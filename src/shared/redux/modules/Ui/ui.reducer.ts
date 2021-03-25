import {
  SWITCH_BOOKMARK_CREATE_MODAL,
  SWITCH_BOOKMARK_UPDATE_MODAL,
  SWITCH_FORGOT_PASSWORD_MODAL,
  SWITCH_LANGUAGES_MODAL,
  SWITCH_LIST_MODAL,
  SWITCH_LOGIN_MODAL,
  SWITCH_MESSAGE_MODAL,
  SWITCH_RESET_PASSWORD_MODAL,
  SWITCH_SIGN_UP_MODAL,
  SWITCH_USER_MODAL,
  SWITCH_WELCOME_MODAL,
  UiActions,
  UiState,
} from './ui.types';

export const initialState: UiState = {
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
  welcomeModal: {
    type: 'popup',
    mounted: false,
  },
  signUpModal: {
    type: 'popup',
    mounted: false,
  },
  forgotPasswordModal: {
    type: 'popup',
    mounted: false,
  },
  resetPasswordModal: {
    type: 'popup',
    mounted: false,
  },
  bookmarkCreateModal: {
    type: 'popup',
    mounted: false,
  },
  bookmarkUpdateModal: {
    type: 'popup',
    mounted: false,
    bookmarkId: undefined,
  },
  listModal: {
    type: 'popup',
    mounted: false,
  },
};

export const Ui = (state = initialState, action: UiActions): UiState => {
  switch (action.type) {
    case SWITCH_USER_MODAL:
    case SWITCH_LANGUAGES_MODAL:
    case SWITCH_MESSAGE_MODAL:
    case SWITCH_LOGIN_MODAL:
    case SWITCH_WELCOME_MODAL:
    case SWITCH_SIGN_UP_MODAL:
    case SWITCH_FORGOT_PASSWORD_MODAL:
    case SWITCH_RESET_PASSWORD_MODAL:
    case SWITCH_BOOKMARK_CREATE_MODAL:
    case SWITCH_BOOKMARK_UPDATE_MODAL:
    case SWITCH_LIST_MODAL:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
