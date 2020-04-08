export const LOAD_LANGUAGES_STARTED = 'LOAD_LANGUAGES_STARTED';
export const LOAD_LANGUAGES_SUCCESS = 'LOAD_LANGUAGES_SUCCESS';

export interface LanguageState {
  id: number;
  slug: string;
  isDefault: boolean;
}

export type LanguagesState = {
  byKey: {
    [key: string]: LanguageState;
  };
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

export interface LanguagesApiResponse {
  status: string;
  data: {
    Languages: LanguagesState;
  };
}

export type LanguagesActionsTypes = RequestLanguagesAction | ReceiveLanguagesAction;
