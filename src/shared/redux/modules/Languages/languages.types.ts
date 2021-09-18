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
  following: string;
  followers: string;
  since: string;
  serverError: string;
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
