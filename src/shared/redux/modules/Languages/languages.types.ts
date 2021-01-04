export const LOAD_LANGUAGES_STARTED = 'LOAD_LANGUAGES_STARTED';
export const LOAD_LANGUAGES_SUCCESS = 'LOAD_LANGUAGES_SUCCESS';
export const SWITCH_CURRENT_LANGUAGE = 'SWITCH_CURRENT_LANGUAGE';
export const SWITCH_CURRENT_LANGUAGE_RECEIVE = 'SWITCH_CURRENT_LANGUAGE_RECEIVE';
export const SWITCH_CURRENT_LANGUAGE_REQUEST = 'SWITCH_CURRENT_LANGUAGE_REQUEST';

export interface GlossaryState {
  home: string;
  login: string;
  logout: string;
  control: string;
  notFound: string;
  tags: string;
  trending: string;
  lists: string;
  bookmarks: string;
  links: string;
  users: string;
  following: string;
  followers: string;
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

interface RequestLanguagesAction {
  type: typeof LOAD_LANGUAGES_STARTED;
  data: {
    loading: boolean;
  };
}

interface ReceiveLanguagesAction {
  type: typeof LOAD_LANGUAGES_SUCCESS;
  data: {
    loading: boolean;
  };
}

interface SwitchCurrentLanguageAction {
  type: typeof SWITCH_CURRENT_LANGUAGE;
  data: {
    loading: boolean;
  };
}

interface SwitchCurrentLanguageRequestAction {
  type: typeof SWITCH_CURRENT_LANGUAGE_REQUEST;
  data: {
    loading: boolean;
  };
}

interface SwitchCurrentLanguageReceiveAction {
  type: typeof SWITCH_CURRENT_LANGUAGE_RECEIVE;
  data: LanguageState;
}

export interface LanguagesApiResponse {
  links: {
    self: string;
  };
  data: {
    type: 'languages';
    attributes: LanguageState;
  }[];
}

export type LanguagesActionsTypes =
  | RequestLanguagesAction
  | ReceiveLanguagesAction
  | SwitchCurrentLanguageAction
  | SwitchCurrentLanguageRequestAction
  | SwitchCurrentLanguageReceiveAction;
