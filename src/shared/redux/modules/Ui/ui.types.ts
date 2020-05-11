export const SWITCH_USER_MODAL = 'SWITCH_USER_MODAL';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';

export interface UiState {
  screenLocked: boolean;
  userModal: UiUserModalState;
  messageModal: UiMessageModalState;
  loginModal: UiLoginModalState;
}

export interface UiUserModalState {
  type: 'popup';
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

interface SwitchUserModal {
  type: typeof SWITCH_USER_MODAL;
}

interface SwitchMessageModal {
  type: typeof SWITCH_MESSAGE_MODAL;
}

interface SwitchLoginModal {
  type: typeof SWITCH_LOGIN_MODAL;
}

export type UiActionsTypes = SwitchUserModal | SwitchMessageModal | SwitchLoginModal;
