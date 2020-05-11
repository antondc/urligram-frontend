export const LOAD_LANGUAGES_STARTED = 'LOAD_LANGUAGES_STARTED';
export const LOAD_LANGUAGES_SUCCESS = 'LOAD_LANGUAGES_SUCCESS';
export const SWITCH_CURRENT_LANGUAGE = 'SWITCH_CURRENT_LANGUAGE';
export const SWITCH_CURRENT_LANGUAGE_RECEIVE = 'SWITCH_CURRENT_LANGUAGE_RECEIVE';
export const SWITCH_CURRENT_LANGUAGE_REQUEST = 'SWITCH_CURRENT_LANGUAGE_REQUEST';

export interface GlossaryState {
  Home: string;
  Login: string;
  LogOut: string;
  Control: string;
  NotFound: string;
  Tags: string;
  Trending: string;
  Lists: string;
}

export interface LanguageState {
  id: number;
  slug: string;
  name: string;
  isDefault: boolean;
  loading?: boolean;
  glossary: GlossaryState;
}

export type LanguagesState = {
  byKey: {
    [key: string]: LanguageState;
  };
  currentLanguage: LanguageState;
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
  status: string;
  data: {
    Languages: LanguagesState;
  };
}

export type LanguagesActionsTypes =
  | RequestLanguagesAction
  | ReceiveLanguagesAction
  | SwitchCurrentLanguageAction
  | SwitchCurrentLanguageRequestAction
  | SwitchCurrentLanguageReceiveAction;
