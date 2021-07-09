export const USER_MODAL_MOUNT = 'USER_MODAL_MOUNT';
export const USER_MODAL_UNMOUNT = 'USER_MODAL_UNMOUNT';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';
export const SWITCH_LANGUAGES_MODAL = 'SWITCH_LANGUAGES_MODAL';
export const SWITCH_WELCOME_MODAL = 'SWITCH_WELCOME_MODAL';
export const SWITCH_SIGN_UP_MODAL = 'SWITCH_SIGN_UP_MODAL';
export const SWITCH_FORGOT_PASSWORD_MODAL = 'SWITCH_FORGOT_PASSWORD_MODAL';
export const SWITCH_RESET_PASSWORD_MODAL = 'SWITCH_RESET_PASSWORD_MODAL';
export const SWITCH_BOOKMARK_CREATE_MODAL = 'SWITCH_BOOKMARK_CREATE_MODAL';
export const SWITCH_BOOKMARK_UPDATE_MODAL = 'SWITCH_BOOKMARK_UPDATE_MODAL';
export const SWITCH_LIST_ADD_USER_MODAL = 'SWITCH_LIST_ADD_USER_MODAL';
export const UI_BOOKMARK_LISTS_MODALS_MOUNT = 'UI_BOOKMARK_LISTS_MODALS_MOUNT';
export const UI_BOOKMARK_LISTS_MODALS_UNMOUNT = 'UI_BOOKMARK_LISTS_MODALS_UNMOUNT';
export const SWITCH_LIST_MODAL = 'SWITCH_LIST_MODAL';
export const UI_NOTIFICATION_VIEWED = 'UI_NOTIFICATION_VIEWED';
export const UI_NOTIFICATION_PUSH = 'UI_NOTIFICATION_PUSH';
export const UI_CLOSE_ALL_MODALS = 'UI_CLOSE_ALL_MODALS';

export type UiBaseModal = {
  type?: 'modal' | 'popup';
  mounted: boolean;
};

export type NotificationTypeState =
  | 'bookmark-creation'
  | 'bookmark-grabbed'
  | 'bookmark-deleted'
  | 'general-error'
  | 'link-voted';

export type NotificationState = {
  number?: number;
  id?: string;
  userId?: string;
  listId?: number;
  bookmarkId?: number;
  linkId?: number;
  type: NotificationTypeState;
  style: 'alert' | 'error' | 'success';
  status: 'viewed' | 'pending';
};

export type BookmarkListsModal = {
  bookmarkId?: number;
} & UiBaseModal;

export type BookmarkSendModal = {
  bookmarkId?: number;
} & UiBaseModal;

export type BookmarkListsModals = Array<BookmarkListsModal>;
export type BookmarkSendModals = Array<BookmarkSendModal>;

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
  bookmarkUpdateModal: {
    bookmarkId: number;
  } & UiBaseModal;
  listModal: {
    listId?: number;
  } & UiBaseModal;
  listAddUserModal: UiBaseModal;
  bookmarkListsModal: {
    bookmarkId?: number;
  } & UiBaseModal;
  bookmarkSendModals: BookmarkSendModals;
  notifications?: NotificationState[];
};

interface UserModalMount {
  type: typeof USER_MODAL_MOUNT;
  payload: Partial<UiState>;
}

interface UserModalUnmount {
  type: typeof USER_MODAL_UNMOUNT;
  payload: Partial<UiState>;
}

interface SwitchLanguagesModal {
  type: typeof SWITCH_LANGUAGES_MODAL;
  payload: Partial<UiState>;
}

interface SwitchMessageModal {
  type: typeof SWITCH_MESSAGE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchLoginModal {
  type: typeof SWITCH_LOGIN_MODAL;
  payload: Partial<UiState>;
}

interface SwitchWelcomeModal {
  type: typeof SWITCH_WELCOME_MODAL;
  payload: Partial<UiState>;
}

interface SwitchSignUpModal {
  type: typeof SWITCH_SIGN_UP_MODAL;
  payload: Partial<UiState>;
}

interface SwitchForgotPasswordModal {
  type: typeof SWITCH_FORGOT_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchResetPasswordModal {
  type: typeof SWITCH_RESET_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchBookmarkCreateModal {
  type: typeof SWITCH_BOOKMARK_CREATE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchBookmarkUpdateModal {
  type: typeof SWITCH_BOOKMARK_UPDATE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchListModal {
  type: typeof SWITCH_LIST_MODAL;
  payload: Partial<UiState>;
}

interface BookmarkListModalsMount {
  type: typeof UI_BOOKMARK_LISTS_MODALS_MOUNT;
  payload: Partial<UiState>;
}

interface BookmarkListModalsUnmount {
  type: typeof UI_BOOKMARK_LISTS_MODALS_UNMOUNT;
  payload: Partial<UiState>;
}

interface UiNotificationViewedAction {
  type: typeof UI_NOTIFICATION_VIEWED;
  payload: UiState;
}

interface UiNotificationPushAction {
  type: typeof UI_NOTIFICATION_PUSH;
  payload: UiState;
}

interface UiCloseAllModals {
  type: typeof UI_CLOSE_ALL_MODALS;
  payload: UiState;
}

interface SwitchListAddUserModal {
  type: typeof SWITCH_LIST_ADD_USER_MODAL;
  payload: UiState;
}

export type UiActions =
  | UserModalMount
  | UserModalUnmount
  | SwitchLanguagesModal
  | SwitchMessageModal
  | SwitchLoginModal
  | SwitchWelcomeModal
  | SwitchSignUpModal
  | SwitchForgotPasswordModal
  | SwitchResetPasswordModal
  | SwitchBookmarkCreateModal
  | SwitchBookmarkUpdateModal
  | SwitchListModal
  | BookmarkListModalsMount
  | BookmarkListModalsUnmount
  | UiNotificationViewedAction
  | UiNotificationPushAction
  | UiCloseAllModals
  | SwitchListAddUserModal;
