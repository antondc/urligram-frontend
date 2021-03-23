import { types, UiActions, UiState } from './ui.types';

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

export const Ui = (state = initialState, action: UiActions): typeof initialState =>
  Object.hasOwnProperty.call(types, action.type) ? Object.assign({}, state, action.payload) : state;
