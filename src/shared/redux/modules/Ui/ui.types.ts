export const SWITCH_USER_MODAL = 'SWITCH_USER_MODAL';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';
export const SWITCH_LANGUAGES_MODAL = 'SWITCH_LANGUAGES_MODAL';
export const SWITCH_WELCOME_MODAL = 'SWITCH_WELCOME_MODAL';
export const SWITCH_SIGN_UP_MODAL = 'SWITCH_SIGN_UP_MODAL';
export const SWITCH_FORGOT_PASSWORD_MODAL = 'SWITCH_FORGOT_PASSWORD_MODAL';
export const SWITCH_RESET_PASSWORD_MODAL = 'SWITCH_RESET_PASSWORD_MODAL';
export const SWITCH_BOOKMARK_MODAL = 'SWITCH_BOOKMARK_MODAL';

export type UiBaseModal = {
  type: 'modal'|'popup';
  mounted: boolean;
}
export interface UiState {
  screenLocked: boolean;
  userModal:UiBaseModal
  languagesModal:UiBaseModal
  messageModal:UiBaseModal
  loginModal:UiBaseModal
  welcomeModal:UiBaseModal
  signUpModal:UiBaseModal
  forgotPasswordModal:UiBaseModal
  resetPasswordModal:UiBaseModal
  bookmarkModal:UiBaseModal
}

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
  data: {
    mounted: boolean;
  };
}

interface SwitchWelcomeModal {
  type: typeof SWITCH_WELCOME_MODAL;
  data: {
    mounted: boolean;
  };
}

interface SwitchSignUpModal {
  type: typeof SWITCH_SIGN_UP_MODAL;
  data: {
    mounted: boolean;
  };
}

interface SwitchForgotPasswordModal {
  type: typeof SWITCH_FORGOT_PASSWORD_MODAL;
  data: {
    mounted: boolean;
  };
}

interface SwitchResetPasswordModal {
  type: typeof SWITCH_RESET_PASSWORD_MODAL;
  data: {
    mounted: boolean;
  };
}

interface SwitchBookmarkModal {
  type: typeof SWITCH_BOOKMARK_MODAL;
  data: {
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
  | SwitchResetPasswordModal|SwitchBookmarkModal;
