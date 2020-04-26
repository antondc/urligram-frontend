export const SWITCH_USER_MODAL = 'SWITCH_USER_MODAL';

export interface UiState {
  userModal: UiUserModalState;
}

export interface UiUserModalState {
  mounted: boolean;
}

interface SwitchUserModal {
  type: typeof SWITCH_USER_MODAL;
}

export type UiActionsTypes = SwitchUserModal;
