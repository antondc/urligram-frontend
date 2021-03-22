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
  UiActionsTypes,
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

export const Ui = (state = initialState, action: UiActionsTypes): UiState => {
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
          mounted: action.data.mounted,
        },
      });
    case SWITCH_WELCOME_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        welcomeModal: {
          ...state.welcomeModal,
          mounted: action.data.mounted,
        },
      });
    case SWITCH_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        signUpModal: {
          ...state.signUpModal,
          mounted: action.data.mounted,
        },
      });
    case SWITCH_FORGOT_PASSWORD_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        forgotPasswordModal: {
          ...state.forgotPasswordModal,
          mounted: action.data.mounted,
        },
      });
    case SWITCH_RESET_PASSWORD_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        resetPasswordModal: {
          ...state.resetPasswordModal,
          mounted: action.data.mounted,
        },
      });
    case SWITCH_BOOKMARK_CREATE_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        bookmarkCreateModal: {
          ...state.bookmarkCreateModal,
          mounted: action.data.mounted,
        },
      });
    case SWITCH_BOOKMARK_UPDATE_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        bookmarkUpdateModal: {
          ...state.bookmarkUpdateModal,
          mounted: action.data.mounted,
          bookmarkId: action.data.bookmarkId,
        },
      });
    case SWITCH_LIST_MODAL:
      return Object.assign({}, state, {
        screenLocked: !state.screenLocked,
        listModal: {
          ...state.listModal,
          mounted: action.data.mounted,
        },
      });

    default:
      return Object.assign({}, state);
  }
};
