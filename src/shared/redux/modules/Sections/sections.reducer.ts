import {
  LOAD_MOST_POPULAR_LISTS_STARTED,
  LOAD_MOST_POPULAR_LISTS_SUCCESS,
  SECTIONS_FOLLOWERS_USERS_RECEIVE,
  SECTIONS_FOLLOWERS_USERS_REQUEST,
  SECTIONS_FOLLOWING_LISTS_RECEIVE,
  SECTIONS_FOLLOWING_LISTS_REQUEST,
  SECTIONS_FOLLOWING_USERS_RECEIVE,
  SECTIONS_FOLLOWING_USERS_REQUEST,
  SECTIONS_MOST_FOLLOWED_USERS_RECEIVE,
  SECTIONS_MOST_FOLLOWED_USERS_REQUEST,
  SECTIONS_MOST_USED_TAGS_RECEIVE,
  SECTIONS_MOST_USED_TAGS_REQUEST,
  SECTIONS_MY_LISTS_RECEIVE,
  SECTIONS_MY_LISTS_REQUEST,
  SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE,
  SECTIONS_MY_RECENT_BOOKMARKS_REQUEST,
  SECTIONS_MY_TAGS_RECEIVE,
  SECTIONS_MY_TAGS_REQUEST,
  SECTIONS_NEW_LISTS_RECEIVE,
  SECTIONS_NEW_LISTS_REQUEST,
  SECTIONS_NEW_USERS_RECEIVE,
  SECTIONS_NEW_USERS_REQUEST,
  SECTIONS_SIMILAR_LISTS_RECEIVE,
  SECTIONS_SIMILAR_LISTS_REQUEST,
  SECTIONS_TAGS_IN_THIS_LIST_RECEIVE,
  SECTIONS_TAGS_IN_THIS_LIST_REQUEST,
  SECTIONS_USER_LISTS_RECEIVE,
  SECTIONS_USER_LISTS_REQUEST,
  SECTIONS_USER_MOST_USED_TAGS_RECEIVE,
  SECTIONS_USER_MOST_USED_TAGS_REQUEST,
  SECTIONS_USERS_IN_THIS_LIST_RECEIVE,
  SECTIONS_USERS_IN_THIS_LIST_REQUEST,
  SectionsActions,
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

export const Sections = (state = initialState, action: SectionsActions): SectionsState => {
  switch (action.type) {
    case LOAD_MOST_POPULAR_LISTS_STARTED:
      return Object.assign({}, state, {
        PopularLists: {
          loading: true,
        },
      });
    case LOAD_MOST_POPULAR_LISTS_SUCCESS:
      return Object.assign({}, state, {
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
        MostFollowedUsers: {
          currentIds: action.data.MostFollowedUsers?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_NEW_USERS_REQUEST:
      return Object.assign({}, state, {
        NewUsers: {
          loading: true,
        },
      });
    case SECTIONS_NEW_USERS_RECEIVE:
      return Object.assign({}, state, {
        NewUsers: {
          currentIds: action.data.NewUsers?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_MY_LISTS_REQUEST:
      return Object.assign({}, state, {
        MyLists: {
          loading: true,
        },
      });
    case SECTIONS_MY_LISTS_RECEIVE:
      return Object.assign({}, state, {
        MyLists: {
          currentIds: action.data.MyLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_FOLLOWING_LISTS_REQUEST:
      return Object.assign({}, state, {
        FollowingLists: {
          loading: true,
        },
      });
    case SECTIONS_FOLLOWING_LISTS_RECEIVE:
      return Object.assign({}, state, {
        FollowingLists: {
          currentIds: action.data.FollowingLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_MY_TAGS_REQUEST:
      return Object.assign({}, state, {
        MyTags: {
          loading: true,
        },
      });
    case SECTIONS_MY_TAGS_RECEIVE:
      return Object.assign({}, state, {
        MyTags: {
          currentIds: action.data.MyTags?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_FOLLOWING_USERS_REQUEST:
      return Object.assign({}, state, {
        FollowingUsers: {
          loading: true,
        },
      });
    case SECTIONS_FOLLOWING_USERS_RECEIVE:
      return Object.assign({}, state, {
        FollowingUsers: {
          currentIds: action.data.FollowingUsers?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_MOST_USED_TAGS_REQUEST:
      return Object.assign({}, state, {
        MostFollowedTags: {
          loading: true,
        },
      });
    case SECTIONS_MOST_USED_TAGS_RECEIVE:
      return Object.assign({}, state, {
        MostUsedTags: {
          currentIds: action.data.MostUsedTags?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_USER_LISTS_REQUEST:
      return Object.assign({}, state, {
        UserLists: {
          loading: true,
        },
      });
    case SECTIONS_USER_LISTS_RECEIVE:
      return Object.assign({}, state, {
        UserLists: {
          currentIds: action.data.UserLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_FOLLOWERS_USERS_REQUEST:
      return Object.assign({}, state, {
        FollowersUsers: {
          loading: true,
        },
      });
    case SECTIONS_FOLLOWERS_USERS_RECEIVE:
      return Object.assign({}, state, {
        FollowersUsers: {
          currentIds: action.data.FollowersUsers?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_SIMILAR_LISTS_REQUEST:
      return Object.assign({}, state, {
        SimilarLists: {
          loading: true,
        },
      });
    case SECTIONS_SIMILAR_LISTS_RECEIVE:
      return Object.assign({}, state, {
        SimilarLists: {
          currentIds: action.data.SimilarLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_USERS_IN_THIS_LIST_REQUEST:
      return Object.assign({}, state, {
        UsersInThisList: {
          loading: true,
        },
      });
    case SECTIONS_USERS_IN_THIS_LIST_RECEIVE:
      return Object.assign({}, state, {
        UsersInThisList: {
          currentIds: action.data.UsersInThisList?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_TAGS_IN_THIS_LIST_REQUEST:
      return Object.assign({}, state, {
        TagsInThisList: {
          loading: true,
        },
      });
    case SECTIONS_TAGS_IN_THIS_LIST_RECEIVE:
      return Object.assign({}, state, {
        TagsInThisList: {
          currentIds: action.data.TagsInThisList?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_MY_RECENT_BOOKMARKS_REQUEST:
      return Object.assign({}, state, {
        MyRecentBookmarks: {
          loading: true,
        },
      });
    case SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE:
      return Object.assign({}, state, {
        MyRecentBookmarks: {
          currentIds: action.data.MyRecentBookmarks?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_USER_MOST_USED_TAGS_REQUEST:
      return Object.assign({}, state, {
        UserMostUsedTags: {
          loading: true,
        },
      });
    case SECTIONS_USER_MOST_USED_TAGS_RECEIVE:
      return Object.assign({}, state, {
        UserMostUsedTags: {
          currentIds: action.data.UserMostUsedTags?.currentIds,
          loading: false,
        },
      });
    default:
      return Object.assign({}, state);
  }
};
