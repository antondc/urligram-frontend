export const SWITCH_USER_MODAL = 'SWITCH_USER_MODAL';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';
export const SWITCH_LANGUAGES_MODAL = 'SWITCH_LANGUAGES_MODAL';
export const SWITCH_WELCOME_MODAL = 'SWITCH_WELCOME_MODAL';
export const SWITCH_SIGN_UP_MODAL = 'SWITCH_SIGN_UP_MODAL';
export const SWITCH_FORGOT_PASSWORD_MODAL = 'SWITCH_FORGOT_PASSWORD_MODAL';
export const SWITCH_RESET_PASSWORD_MODAL = 'SWITCH_RESET_PASSWORD_MODAL';
export const SWITCH_BOOKMARK_CREATE_MODAL = 'SWITCH_BOOKMARK_CREATE_MODAL';
export const SWITCH_BOOKMARK_UPDATE_MODAL = 'SWITCH_BOOKMARK_UPDATE_MODAL';
export const SWITCH_LIST_MODAL = 'SWITCH_LIST_MODAL';

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
  type: typeof SWITCH_USER_MODAL;
}

interface SwitchLanguagesModal {
  type: typeof SWITCH_LANGUAGES_MODAL;
}

interface SwitchMessageModal {
  type: typeof SWITCH_MESSAGE_MODAL;
}

interface SwitchLoginModal {
  type: typeof SWITCH_LOGIN_MODAL;
  payload: {
    mounted: boolean;
  };
}

interface SwitchWelcomeModal {
  type: typeof SWITCH_WELCOME_MODAL;
  payload: {
    mounted: boolean;
  };
}

interface SwitchSignUpModal {
  type: typeof SWITCH_SIGN_UP_MODAL;
  payload: {
    mounted: boolean;
  };
}

interface SwitchForgotPasswordModal {
  type: typeof SWITCH_FORGOT_PASSWORD_MODAL;
  payload: {
    mounted: boolean;
  };
}

interface SwitchResetPasswordModal {
  type: typeof SWITCH_RESET_PASSWORD_MODAL;
  payload: {
    mounted: boolean;
  };
}

interface SwitchBookmarkCreateModal {
  type: typeof SWITCH_BOOKMARK_CREATE_MODAL;
  payload: {
    mounted: boolean;
  };
}

interface SwitchBookmarkUpdateModal {
  type: typeof SWITCH_BOOKMARK_UPDATE_MODAL;
  payload: {
    mounted: boolean;
    bookmarkId: number;
  };
}

interface SwitchListModal {
  type: typeof SWITCH_LIST_MODAL;
  payload: {
    mounted: boolean;
  };
}

export type UiActionsTypes =
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
