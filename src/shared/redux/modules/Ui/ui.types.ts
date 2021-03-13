export const SWITCH_USER_MODAL = 'SWITCH_USER_MODAL';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';
export const SWITCH_LANGUAGES_MODAL = 'SWITCH_LANGUAGES_MODAL';
export const SWITCH_WELCOME_MODAL = 'SWITCH_WELCOME_MODAL';
export const SWITCH_SIGN_UP_MODAL = 'SWITCH_SIGN_UP_MODAL';

export interface UiState {
  screenLocked: boolean;
  userModal: UiUserModalState;
  languagesModal: UiLanguagesModalState;
  messageModal: UiMessageModalState;
  loginModal: UiLoginModalState;
  welcomeModal: UiWelcomeModalState;
  signUpModal: UiSignUpModalState;
}

export interface UiUserModalState {
  type: 'modal';
  mounted: boolean;
}

export interface UiLanguagesModalState {
  type: 'modal';
  mounted: boolean;
}

export interface UiMessageModalState {
  type: 'popup';
  mounted: boolean;
}

export interface UiLoginModalState {
  type: 'popup';
  mounted: boolean;
}

export interface UiWelcomeModalState {
  type: 'popup';
  mounted: boolean;
}

export interface UiSignUpModalState {
  type: 'popup';
  mounted: boolean;
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

export type UiActionsTypes =
  | SwitchUserModal
  | SwitchLanguagesModal
  | SwitchMessageModal
  | SwitchLoginModal
  | SwitchWelcomeModal
  | SwitchSignUpModal;
