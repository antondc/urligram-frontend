export const SWITCH_USER_MODAL = 'SWITCH_USER_MODAL';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';

export interface UiState {
  userModal: UiUserModalState;
  messageModal: UiMessageModalState;
}

export interface UiUserModalState {
  mounted: boolean;
}

export interface UiMessageModalState {
  mounted: boolean;
}

interface SwitchUserModal {
  type: typeof SWITCH_USER_MODAL;
}

interface SwitchMessageModal {
  type: typeof SWITCH_MESSAGE_MODAL;
}

export type UiActionsTypes = SwitchUserModal | SwitchMessageModal;
