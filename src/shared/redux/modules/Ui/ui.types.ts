export const types = {
  SWITCH_USER_MODAL: 'SWITCH_USER_MODAL',
  SWITCH_MESSAGE_MODAL: 'SWITCH_MESSAGE_MODAL',
  SWITCH_LOGIN_MODAL: 'SWITCH_LOGIN_MODAL',
  SWITCH_LANGUAGES_MODAL: 'SWITCH_LANGUAGES_MODAL',
  SWITCH_WELCOME_MODAL: 'SWITCH_WELCOME_MODAL',
  SWITCH_SIGN_UP_MODAL: 'SWITCH_SIGN_UP_MODAL',
  SWITCH_FORGOT_PASSWORD_MODAL: 'SWITCH_FORGOT_PASSWORD_MODAL',
  SWITCH_RESET_PASSWORD_MODAL: 'SWITCH_RESET_PASSWORD_MODAL',
  SWITCH_BOOKMARK_CREATE_MODAL: 'SWITCH_BOOKMARK_CREATE_MODAL',
  SWITCH_BOOKMARK_UPDATE_MODAL: 'SWITCH_BOOKMARK_UPDATE_MODAL',
  SWITCH_LIST_MODAL: 'SWITCH_LIST_MODAL',
};

export type UiBaseModal = {
  type?: 'modal' | 'popup';
  mounted: boolean;
};

export type UiState = {
  screenLocked: boolean;
  userModal: UiBaseModal;
  languagesModal: UiBaseModal;
  messageModal: UiBaseModal;
  loginModal: UiBaseModal;
  welcomeModal: UiBaseModal;
  signUpModal: UiBaseModal;
  forgotPasswordModal: UiBaseModal;
  resetPasswordModal: UiBaseModal;
  bookmarkCreateModal: UiBaseModal;
  bookmarkUpdateModal: UiBaseModal & { bookmarkId: number };
  listModal: UiBaseModal;
};

interface SwitchUserModal {
  type: typeof types.SWITCH_USER_MODAL;
  payload: Partial<UiState>;
}

interface SwitchLanguagesModal {
  type: typeof types.SWITCH_LANGUAGES_MODAL;
  payload: Partial<UiState>;
}

interface SwitchMessageModal {
  type: typeof types.SWITCH_MESSAGE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchLoginModal {
  type: typeof types.SWITCH_LOGIN_MODAL;
  payload: Partial<UiState>;
}

interface SwitchWelcomeModal {
  type: typeof types.SWITCH_WELCOME_MODAL;
  payload: Partial<UiState>;
}

interface SwitchSignUpModal {
  type: typeof types.SWITCH_SIGN_UP_MODAL;
  payload: Partial<UiState>;
}

interface SwitchForgotPasswordModal {
  type: typeof types.SWITCH_FORGOT_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchResetPasswordModal {
  type: typeof types.SWITCH_RESET_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchBookmarkCreateModal {
  type: typeof types.SWITCH_BOOKMARK_CREATE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchBookmarkUpdateModal {
  type: typeof types.SWITCH_BOOKMARK_UPDATE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchListModal {
  type: typeof types.SWITCH_LIST_MODAL;
  payload: Partial<UiState>;
}

export type UiActions =
  | SwitchUserModal
  | SwitchLanguagesModal
  | SwitchMessageModal
  | SwitchLoginModal
  | SwitchWelcomeModal
  | SwitchSignUpModal
  | SwitchForgotPasswordModal
  | SwitchResetPasswordModal
  | SwitchBookmarkCreateModal
  | SwitchBookmarkUpdateModal
  | SwitchListModal;
