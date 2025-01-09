import { UnknownAction } from 'redux';

export const UI_SCREEN_TYPE_SET = 'UI_SCREEN_TYPE_SET';
export const UI_SCREEN_DESKTOP_LOCK = 'UI_SCREEN_DESKTOP_LOCK';
export const UI_SCREEN_DESKTOP_UNLOCK = 'UI_SCREEN_DESKTOP_UNLOCK';
export const UI_SCREEN_MOBILE_LOCK = 'UI_SCREEN_MOBILE_LOCK';
export const UI_SCREEN_MOBILE_UNLOCK = 'UI_SCREEN_MOBILE_UNLOCK';
export const USER_MODAL_MOUNT = 'USER_MODAL_MOUNT';
export const USER_MODAL_UNMOUNT = 'USER_MODAL_UNMOUNT';
export const SWITCH_MESSAGE_MODAL = 'SWITCH_MESSAGE_MODAL';
export const SWITCH_LOGIN_MODAL = 'SWITCH_LOGIN_MODAL';
export const SWITCH_LANGUAGES_MODAL = 'SWITCH_LANGUAGES_MODAL';
export const SWITCH_WELCOME_MODAL = 'SWITCH_WELCOME_MODAL';
export const SWITCH_WELCOME_MODAL_ERROR = 'SWITCH_WELCOME_MODAL_ERROR';
export const SWITCH_SIGN_UP_MODAL = 'SWITCH_SIGN_UP_MODAL';
export const SWITCH_FORGOT_PASSWORD_MODAL = 'SWITCH_FORGOT_PASSWORD_MODAL';
export const SWITCH_RESET_PASSWORD_MODAL = 'SWITCH_RESET_PASSWORD_MODAL';
export const SWITCH_BOOKMARK_CREATE_MODAL = 'SWITCH_BOOKMARK_CREATE_MODAL';
export const SWITCH_BOOKMARK_UPDATE_MODAL = 'SWITCH_BOOKMARK_UPDATE_MODAL';
export const SWITCH_SIGN_UP_DISABLED_MODAL = 'SWITCH_SIGN_UP_DISABLED_MODAL';
export const SWITCH_LIST_ADD_USER_MODAL = 'SWITCH_LIST_ADD_USER_MODAL';
export const UI_BOOKMARK_LISTS_MODALS_MOUNT = 'UI_BOOKMARK_LISTS_MODALS_MOUNT';
export const UI_BOOKMARK_LISTS_MODALS_UNMOUNT = 'UI_BOOKMARK_LISTS_MODALS_UNMOUNT';
export const UI_BOOKMARK_LISTS_MODALS_LOADING = 'UI_BOOKMARK_LISTS_MODALS_LOADING';
export const SWITCH_LIST_MODAL = 'SWITCH_LIST_MODAL';
export const UI_NOTIFICATION_VIEWED = 'UI_NOTIFICATION_VIEWED';
export const UI_NOTIFICATION_PUSH = 'UI_NOTIFICATION_PUSH';
export const UI_CLOSE_ALL_MODALS = 'UI_CLOSE_ALL_MODALS';
export const UI_SWITCH_BOOKMARK_ICONS_MOUNTED = 'UI_SWITCH_BOOKMARK_ICONS_MOUNTED';
export const UI_SWITCH_BOOKMARK_ICONS_UNMOUNTED = 'UI_SWITCH_BOOKMARK_ICONS_UNMOUNTED';
export const UI_SIDEBAR_LEFT_OPEN = 'UI_SIDEBAR_LEFT_OPEN';
export const UI_SIDEBAR_LEFT_CLOSE = 'UI_SIDEBAR_LEFT_CLOSE';
export const UI_SIDEBAR_LISTS_OPEN = 'UI_SIDEBAR_LISTS_OPEN';
export const UI_SIDEBAR_LISTS_CLOSE = 'UI_SIDEBAR_LISTS_CLOSE';

export type UiBaseModal = {
  type?: 'modal' | 'popup' | 'slider';
  mounted?: boolean;
};

export enum NotificationType {
  BookmarkPrivateLimitReached = 'bookmark-pricate-limit-reached',
  BookmarkCreation = 'bookmark-creation',
  BookmarkGrabbed = 'bookmark-grabbed',
  BookmarkDeleted = 'bookmark-deleted',
  GeneralError = 'general-error',
  LinkVoted = 'link-voted',
  BookmarkNorRemovableFromList = 'bookmark-not-removable-from-list',
  BookmarkAddedToList = 'bookmark-added-to-list',
  BookmarkNotAddedToList = 'bookmark-not-added-to-list',
  BookmarkRemovedFromList = 'bookmark-removed-from-list',
}

export enum NotificationStyle {
  Alert = 'alert',
  Error = 'error',
  Success = 'success',
}

export enum NotificationStatus {
  Viewed = 'viewed',
  Pending = 'pending',
}

export type NotificationState = {
  number?: number;
  id?: string;
  userId?: string;
  listId?: number;
  bookmarkId?: number;
  linkId?: number;
  bookmarkTitle?: string;
  listTitle?: string;
  type: NotificationType;
  style: NotificationStyle;
  status: NotificationStatus;
};

type BookmarkSendModal = {
  bookmarkId?: number;
} & UiBaseModal;

type BookmarkSendModals = Array<BookmarkSendModal>;

export enum ScreenType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export type UiState = {
  screenType: ScreenType;
  screenMobileLocked: boolean;
  screenLocked: boolean;
  userModal: UiBaseModal;
  languagesModal: UiBaseModal;
  messageModal: UiBaseModal;
  loginModal: UiBaseModal;
  welcomeModal: UiBaseModal;
  welcomeModalError: UiBaseModal;
  signUpModal: UiBaseModal;
  forgotPasswordModal: UiBaseModal;
  resetPasswordModal: UiBaseModal;
  bookmarkCreateModal: UiBaseModal;
  bookmarkUpdateModal: {
    bookmarkId?: number;
  } & UiBaseModal;
  bookmarkActionsIcons: {
    bookmarkId: number;
  } & UiBaseModal;
  listModal: {
    listId?: number;
  } & UiBaseModal;
  listAddUserModal: UiBaseModal;
  signUpDisabledModal: UiBaseModal;
  bookmarkSendModals: BookmarkSendModals;
  notifications?: NotificationState[];
  sidebarLeftState: {
    closed: boolean;
  };
  sidebarListsState: {
    open: boolean;
  };
};

interface UiScreenTypeSet extends UnknownAction {
  type: typeof UI_SCREEN_TYPE_SET;
  payload: Partial<UiState>;
}

interface UiScreenLock extends UnknownAction {
  type: typeof UI_SCREEN_DESKTOP_LOCK;
  payload: Partial<UiState>;
}

interface UiScreenUnLock extends UnknownAction {
  type: typeof UI_SCREEN_DESKTOP_UNLOCK;
  payload: Partial<UiState>;
}

interface UiScreenMobileLock extends UnknownAction {
  type: typeof UI_SCREEN_MOBILE_LOCK;
  payload: Partial<UiState>;
}

interface UiScreenMobileUnLock extends UnknownAction {
  type: typeof UI_SCREEN_MOBILE_UNLOCK;
  payload: Partial<UiState>;
}

interface UserModalMount extends UnknownAction {
  type: typeof USER_MODAL_MOUNT;
  payload: Partial<UiState>;
}

interface UserModalUnmount extends UnknownAction {
  type: typeof USER_MODAL_UNMOUNT;
  payload: Partial<UiState>;
}

interface SwitchLanguagesModal extends UnknownAction {
  type: typeof SWITCH_LANGUAGES_MODAL;
  payload: Partial<UiState>;
}

interface SwitchMessageModal extends UnknownAction {
  type: typeof SWITCH_MESSAGE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchLoginModal extends UnknownAction {
  type: typeof SWITCH_LOGIN_MODAL;
  payload: Partial<UiState>;
}

interface SwitchWelcomeModal extends UnknownAction {
  type: typeof SWITCH_WELCOME_MODAL;
  payload: Partial<UiState>;
}

interface SwitchWelcomeModalErrorAction extends UnknownAction {
  type: typeof SWITCH_WELCOME_MODAL_ERROR;
  payload: Partial<UiState>;
}

interface SwitchSignUpModal extends UnknownAction {
  type: typeof SWITCH_SIGN_UP_MODAL;
  payload: Partial<UiState>;
}

interface SwitchForgotPasswordModal extends UnknownAction {
  type: typeof SWITCH_FORGOT_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchResetPasswordModal extends UnknownAction {
  type: typeof SWITCH_RESET_PASSWORD_MODAL;
  payload: Partial<UiState>;
}

interface SwitchBookmarkCreateModal extends UnknownAction {
  type: typeof SWITCH_BOOKMARK_CREATE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchBookmarkUpdateModal extends UnknownAction {
  type: typeof SWITCH_BOOKMARK_UPDATE_MODAL;
  payload: Partial<UiState>;
}

interface SwitchListModal extends UnknownAction {
  type: typeof SWITCH_LIST_MODAL;
  payload: Partial<UiState>;
}

interface UiNotificationViewedAction extends UnknownAction {
  type: typeof UI_NOTIFICATION_VIEWED;
  payload: UiState;
}

interface UiNotificationPushAction extends UnknownAction {
  type: typeof UI_NOTIFICATION_PUSH;
  payload: UiState;
}

interface UiCloseAllModals extends UnknownAction {
  type: typeof UI_CLOSE_ALL_MODALS;
  payload: UiState;
}

interface SwitchListAddUserModal extends UnknownAction {
  type: typeof SWITCH_LIST_ADD_USER_MODAL;
  payload: UiState;
}

interface SwitchSignUpDisabledModal extends UnknownAction {
  type: typeof SWITCH_SIGN_UP_DISABLED_MODAL;
  payload: UiState;
}

interface SwitchBookmarkActionsButtonMounted extends UnknownAction {
  type: typeof UI_SWITCH_BOOKMARK_ICONS_MOUNTED;
  payload: Partial<UiState>;
}

interface SwitchBookmarkActionsButtonUnmounted extends UnknownAction {
  type: typeof UI_SWITCH_BOOKMARK_ICONS_UNMOUNTED;
  payload: Partial<UiState>;
}

interface sidebarLeftOpen extends UnknownAction {
  type: typeof UI_SIDEBAR_LEFT_OPEN;
  payload: Partial<UiState>;
}

interface sidebarLeftClose extends UnknownAction {
  type: typeof UI_SIDEBAR_LEFT_CLOSE;
  payload: Partial<UiState>;
}

interface sidebarListsOpen extends UnknownAction {
  type: typeof UI_SIDEBAR_LISTS_OPEN;
  payload: Partial<UiState>;
}

interface sidebarListsClose extends UnknownAction {
  type: typeof UI_SIDEBAR_LISTS_CLOSE;
  payload: Partial<UiState>;
}

export type UiActions =
  | UiScreenTypeSet
  | UiScreenLock
  | UiScreenUnLock
  | UiScreenMobileLock
  | UiScreenMobileUnLock
  | UserModalMount
  | UserModalUnmount
  | SwitchLanguagesModal
  | SwitchMessageModal
  | SwitchLoginModal
  | SwitchWelcomeModal
  | SwitchWelcomeModalErrorAction
  | SwitchSignUpModal
  | SwitchForgotPasswordModal
  | SwitchResetPasswordModal
  | SwitchBookmarkCreateModal
  | SwitchBookmarkUpdateModal
  | SwitchListModal
  | SwitchSignUpDisabledModal
  | UiNotificationViewedAction
  | UiNotificationPushAction
  | UiCloseAllModals
  | SwitchListAddUserModal
  | SwitchBookmarkActionsButtonMounted
  | SwitchBookmarkActionsButtonUnmounted
  | sidebarLeftOpen
  | sidebarLeftClose
  | sidebarListsOpen
  | sidebarListsClose;
