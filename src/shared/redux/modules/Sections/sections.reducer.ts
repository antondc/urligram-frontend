import {
  LOAD_MOST_POPULAR_LISTS_STARTED,
  LOAD_MOST_POPULAR_LISTS_SUCCESS,
  SECTIONS_MOST_FOLLOWED_USERS_RECEIVE,
  SECTIONS_MOST_FOLLOWED_USERS_REQUEST,
  SECTIONS_NEW_LISTS_RECEIVE,
  SECTIONS_NEW_LISTS_REQUEST,
  SectionsActionsTypes,
  SectionsState,
} from './sections.types';

export const initialState: SectionsState = {
  PopularLists: {
    currentIds: [],
    loading: false,
  },
  NewLists: {
    currentIds: [],
    loading: false,
  },
  MostFollowedUsers: {
    currentIds: [],
    loading: false,
  },
};

export const Sections = (state = initialState, action: SectionsActionsTypes): SectionsState => {
  switch (action.type) {
    case LOAD_MOST_POPULAR_LISTS_STARTED:
      return Object.assign({}, state, {
        ...state,
        PopularLists: {
          loading: true,
        },
      });
    case LOAD_MOST_POPULAR_LISTS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        PopularLists: {
          currentIds: action.data.PopularLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_NEW_LISTS_REQUEST:
      return Object.assign({}, state, {
        NewLists: {
          loading: true,
        },
      });
    case SECTIONS_NEW_LISTS_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        NewLists: {
          currentIds: action.data.NewLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_MOST_FOLLOWED_USERS_REQUEST:
      return Object.assign({}, state, {
        MostFollowedUsers: {
          loading: true,
        },
      });
    case SECTIONS_MOST_FOLLOWED_USERS_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        MostFollowedUsers: {
          currentIds: action.data.MostFollowedUsers?.currentIds,
          loading: false,
        },
      });
    default:
      return Object.assign({}, state);
  }
};
