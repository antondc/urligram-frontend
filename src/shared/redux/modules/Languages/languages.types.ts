export const LANGUAGES_LOAD_REQUEST = 'LANGUAGES_LOAD_REQUEST';
export const LANGUAGES_LOAD_SUCCESS = 'LANGUAGES_LOAD_SUCCESS';
export const LANGUAGES_SWITCH_CURRENT_SUCCESS = 'LANGUAGES_SWITCH_CURRENT_SUCCESS';
export const LANGUAGES_SWITCH_CURRENT_REQUEST = 'LANGUAGES_SWITCH_CURRENT_REQUEST';

export interface GlossaryState {
  home: string;
  login: string;
  logout: string;
  control: string;
  notFound: string;
  tags: string;
  trending: string;
  lists: string;
  allBookmarks: string;
  myBookmarks: string;
  bookmarks: string;
  links: string;
  myUser: string;
  users: string;
  followers: string;
  following: string;
  since: string;
  serverError: string;
  myTags: string;
  myLists: string;
  created: string;
  updated: string;
  members: string;
  addToList: string;
  selectTags: string;
  allLists: string;
  addBookmark: string;
  forgotPassword: string;
  passwordForgotten: string;
  nameOrEmail: string;
  rememberIt: string;
  dontHaveAccount: string;
  signUp: string;
  create: string;
  resetPassword: string;
  extension: string;
  bookmarked: string;
  date: string;
  search: string;
  newList: string;
  isPublic: string;
  notes: string;
  title: string;
  save: string;
  listName: string;
  listDescription: string;
  removeList: string;
  myProfile: string;
  allUsers: string;
  name: string;
  addList: string;
  totalBookmarks: string;
  seeMore: string;
  weDidNotFindAnyList: string;
  weDidNotFindAnyBookmark: string;
  password: string;
  accept: string;
  reject: string;
  enter: string;
  exit: string;
  docs: string;
  privateBookmarks: string;
  publicBookmarks: string;
  deleteUser: string;
  thisActionCanNotBeUndone: string;
  delete: string;
  weDidNotFindAnyUser: string;
  thisUserHasNoBookmarksYet: string;
  addUser: string;
  userLists: string;
  updateBookmark: string;
  weUseACookie: string;
  weDoNotShareIt: string;
  youCanFindAllTheInfoAt: string;
  thePolicyPage: string;
  editList: string;
  leaveList: string;
  allTags: string;
  repeatPassword: string;
  email: string;
  alreadyHaveAnAccount: string;
  userBookmarks: string;
  userTags: string;
  deleteConfirmMessage: string;
}

export interface LanguageState {
  id: number;
  order: number;
  slug: string;
  name: string;
  isDefault: boolean;
  loading?: boolean;
  glossary: GlossaryState;
  link?: string;
  isCurrent?: boolean;
}

export type LanguagesState = {
  byKey: {
    [key: string]: LanguageState;
  };
  currentLanguage?: LanguageState;
};

export interface LanguagesApiResponseItem {
  type: 'languages';
  attributes: LanguageState;
}

export interface LanguagesApiResponse {
  links: {
    self: string;
  };
  data: LanguagesApiResponseItem[];
}

interface LanguagesLoadRequestAction {
  type: typeof LANGUAGES_LOAD_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesLoadSuccessAction {
  type: typeof LANGUAGES_LOAD_SUCCESS;
  payload: Partial<LanguagesState>;
}

interface LanguagesSwitchCurrentRequestAction {
  type: typeof LANGUAGES_SWITCH_CURRENT_REQUEST;
  payload: Partial<LanguagesState>;
}

interface LanguagesSwitchCurrentSuccessAction {
  type: typeof LANGUAGES_SWITCH_CURRENT_SUCCESS;
  payload: Partial<LanguagesState>;
}

export type LanguagesActions =
  | LanguagesLoadRequestAction
  | LanguagesLoadSuccessAction
  | LanguagesSwitchCurrentRequestAction
  | LanguagesSwitchCurrentSuccessAction;
