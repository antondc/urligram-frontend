import { BookmarksState } from '../Bookmarks/bookmarks.types';
import { ListsState } from '../Lists/lists.types';
import { TagsState } from '../Tags/tags.types';
import { UsersState } from '../Users/users.types';

export const LOAD_MOST_POPULAR_LISTS_STARTED = 'LOAD_MOST_POPULAR_LISTS_STARTED';
export const LOAD_MOST_POPULAR_LISTS_SUCCESS = 'LOAD_MOST_POPULAR_LISTS_SUCCESS';
export const SECTIONS_NEW_LISTS_REQUEST = 'SECTIONS_NEW_LISTS_REQUEST';
export const SECTIONS_NEW_LISTS_RECEIVE = 'SECTIONS_NEW_LISTS_RECEIVE';
export const SECTIONS_MOST_FOLLOWED_USERS_REQUEST = 'SECTIONS_MOST_FOLLOWED_USERS_REQUEST';
export const SECTIONS_MOST_FOLLOWED_USERS_RECEIVE = 'SECTIONS_MOST_FOLLOWED_USERS_RECEIVE';
export const SECTIONS_NEW_USERS_REQUEST = 'SECTIONS_NEW_USERS_REQUEST';
export const SECTIONS_NEW_USERS_RECEIVE = 'SECTIONS_NEW_USERS_RECEIVE';
export const SECTIONS_MY_LISTS_REQUEST = 'SECTIONS_MY_LISTS_REQUEST';
export const SECTIONS_MY_LISTS_RECEIVE = 'SECTIONS_MY_LISTS_RECEIVE';
export const SECTIONS_FOLLOWING_LISTS_REQUEST = 'SECTIONS_FOLLOWING_LISTS_REQUEST';
export const SECTIONS_FOLLOWING_LISTS_RECEIVE = 'SECTIONS_FOLLOWING_LISTS_RECEIVE';
export const SECTIONS_MY_TAGS_REQUEST = 'SECTIONS_MY_TAGS_REQUEST';
export const SECTIONS_MY_TAGS_RECEIVE = 'SECTIONS_MY_TAGS_RECEIVE';
export const SECTIONS_FOLLOWING_USERS_REQUEST = 'SECTIONS_FOLLOWING_USERS_REQUEST';
export const SECTIONS_FOLLOWING_USERS_RECEIVE = 'SECTIONS_FOLLOWING_USERS_RECEIVE';
export const SECTIONS_MOST_USED_TAGS_REQUEST = 'SECTIONS_MOST_USED_TAGS_REQUEST';
export const SECTIONS_MOST_USED_TAGS_RECEIVE = 'SECTIONS_MOST_USED_TAGS_RECEIVE';
export const SECTIONS_USER_LISTS_REQUEST = 'SECTIONS_USER_LISTS_REQUEST';
export const SECTIONS_USER_LISTS_RECEIVE = 'SECTIONS_USER_LISTS_RECEIVE';
export const SECTIONS_FOLLOWERS_USERS_REQUEST = 'SECTIONS_FOLLOWERS_USERS_REQUEST';
export const SECTIONS_FOLLOWERS_USERS_RECEIVE = 'SECTIONS_FOLLOWERS_USERS_RECEIVE';
export const SECTIONS_SIMILAR_LISTS_REQUEST = 'SECTIONS_SIMILAR_LISTS_REQUEST';
export const SECTIONS_SIMILAR_LISTS_RECEIVE = 'SECTIONS_SIMILAR_LISTS_RECEIVE';
export const SECTIONS_USERS_IN_THIS_LIST_REQUEST = 'SECTIONS_USERS_IN_THIS_LIST_REQUEST';
export const SECTIONS_USERS_IN_THIS_LIST_RECEIVE = 'SECTIONS_USERS_IN_THIS_LIST_RECEIVE';
export const SECTIONS_TAGS_IN_THIS_LIST_REQUEST = 'SECTIONS_TAGS_IN_THIS_LIST_REQUEST';
export const SECTIONS_TAGS_IN_THIS_LIST_RECEIVE = 'SECTIONS_TAGS_IN_THIS_LIST_RECEIVE';
export const SECTIONS_MY_RECENT_BOOKMARKS_REQUEST = 'SECTIONS_MY_RECENT_BOOKMARKS_REQUEST';
export const SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE = 'SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE';
export const SECTIONS_USER_MOST_USED_TAGS_REQUEST = 'SECTIONS_USER_MOST_USED_TAGS_REQUEST';
export const SECTIONS_USER_MOST_USED_TAGS_RECEIVE = 'SECTIONS_USER_MOST_USED_TAGS_RECEIVE';

export interface SectionsState {
  PopularLists?: Partial<ListsState>;
  NewLists?: Partial<ListsState>;
  MyLists?: Partial<ListsState>;
  UserLists?: Partial<ListsState>;
  FollowingLists?: Partial<ListsState>;
  MostFollowedUsers?: Partial<UsersState>;
  NewUsers?: Partial<UsersState>;
  FollowingUsers?: Partial<UsersState>;
  MyTags?: Partial<TagsState>;
  MostUsedTags?: Partial<TagsState>;
  FollowersUsers?: Partial<UsersState>;
  SimilarLists?: Partial<ListsState>;
  UsersInThisList?: Partial<UsersState>;
  TagsInThisList?: Partial<TagsState>;
  MyRecentBookmarks?: Partial<BookmarksState>;
  UserMostUsedTags?: Partial<TagsState>;
}

interface RequestMostPopularListsAction {
  type: typeof LOAD_MOST_POPULAR_LISTS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveMostPopularListsAction {
  type: typeof LOAD_MOST_POPULAR_LISTS_SUCCESS;
  data: SectionsState;
}

interface SectionNewListsRequestAction {
  type: typeof SECTIONS_NEW_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionNewListsReceiveAction {
  type: typeof SECTIONS_NEW_LISTS_RECEIVE;
  data: SectionsState;
}

interface SectionMostFollowedUsersRequestAction {
  type: typeof SECTIONS_MOST_FOLLOWED_USERS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMostFollowedUsersReceiveAction {
  type: typeof SECTIONS_MOST_FOLLOWED_USERS_RECEIVE;
  data: SectionsState;
}

interface SectionNewUsersRequestAction {
  type: typeof SECTIONS_NEW_USERS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionNewUsersReceiveAction {
  type: typeof SECTIONS_NEW_USERS_RECEIVE;
  data: SectionsState;
}

interface SectionMyListsRequestAction {
  type: typeof SECTIONS_MY_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMyListsReceiveAction {
  type: typeof SECTIONS_MY_LISTS_RECEIVE;
  data: SectionsState;
}

interface SectionFollowingListsRequestAction {
  type: typeof SECTIONS_FOLLOWING_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionFollowingListsReceiveAction {
  type: typeof SECTIONS_FOLLOWING_LISTS_RECEIVE;
  data: SectionsState;
}

interface SectionMyTagsRequestAction {
  type: typeof SECTIONS_MY_TAGS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMyTagsReceiveAction {
  type: typeof SECTIONS_MY_TAGS_RECEIVE;
  data: SectionsState;
}

interface SectionFollowingUsersRequestAction {
  type: typeof SECTIONS_FOLLOWING_USERS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionFollowingUsersReceiveAction {
  type: typeof SECTIONS_FOLLOWING_USERS_RECEIVE;
  data: SectionsState;
}

interface SectionMostFollowedTagsRequestAction {
  type: typeof SECTIONS_MOST_USED_TAGS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMostFollowedTagsReceiveAction {
  type: typeof SECTIONS_MOST_USED_TAGS_RECEIVE;
  data: SectionsState;
}

interface SectionUserListsRequestAction {
  type: typeof SECTIONS_USER_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionUserListsReceiveAction {
  type: typeof SECTIONS_USER_LISTS_RECEIVE;
  data: SectionsState;
}

interface SectionFollowersUsersRequestAction {
  type: typeof SECTIONS_FOLLOWERS_USERS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionFollowersUsersReceiveAction {
  type: typeof SECTIONS_FOLLOWERS_USERS_RECEIVE;
  data: SectionsState;
}

interface SectionSimilarListsRequestAction {
  type: typeof SECTIONS_SIMILAR_LISTS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionSimilarListsReceiveAction {
  type: typeof SECTIONS_SIMILAR_LISTS_RECEIVE;
  data: SectionsState;
}

interface SectionUsersInThisListRequestAction {
  type: typeof SECTIONS_USERS_IN_THIS_LIST_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionUsersInThisListReceiveAction {
  type: typeof SECTIONS_USERS_IN_THIS_LIST_RECEIVE;
  data: SectionsState;
}

interface SectionTagsInThisListRequestAction {
  type: typeof SECTIONS_TAGS_IN_THIS_LIST_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionTagsInThisListReceiveAction {
  type: typeof SECTIONS_TAGS_IN_THIS_LIST_RECEIVE;
  data: SectionsState;
}

interface SectionMyRecentBookmarksRequestAction {
  type: typeof SECTIONS_MY_RECENT_BOOKMARKS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionMyRecentBookmarksReceiveAction {
  type: typeof SECTIONS_MY_RECENT_BOOKMARKS_RECEIVE;
  data: SectionsState;
}

interface SectionUserMostFollowedTagsRequestAction {
  type: typeof SECTIONS_USER_MOST_USED_TAGS_REQUEST;
  data: {
    loading: true;
  };
}

interface SectionUserMostFollowedTagsReceiveAction {
  type: typeof SECTIONS_USER_MOST_USED_TAGS_RECEIVE;
  data: SectionsState;
}

export type SectionsActionsTypes =
  | RequestMostPopularListsAction
  | ReceiveMostPopularListsAction
  | SectionNewListsRequestAction
  | SectionNewListsReceiveAction
  | SectionMostFollowedUsersRequestAction
  | SectionMostFollowedUsersReceiveAction
  | SectionNewUsersRequestAction
  | SectionNewUsersReceiveAction
  | SectionMyListsRequestAction
  | SectionMyListsReceiveAction
  | SectionFollowingListsRequestAction
  | SectionFollowingListsReceiveAction
  | SectionMyTagsRequestAction
  | SectionMyTagsReceiveAction
  | SectionFollowingUsersRequestAction
  | SectionFollowingUsersReceiveAction
  | SectionMostFollowedTagsRequestAction
  | SectionMostFollowedTagsReceiveAction
  | SectionUserListsRequestAction
  | SectionUserListsReceiveAction
  | SectionFollowersUsersRequestAction
  | SectionFollowersUsersReceiveAction
  | SectionSimilarListsRequestAction
  | SectionSimilarListsReceiveAction
  | SectionUsersInThisListRequestAction
  | SectionUsersInThisListReceiveAction
  | SectionTagsInThisListRequestAction
  | SectionTagsInThisListReceiveAction
  | SectionMyRecentBookmarksRequestAction
  | SectionMyRecentBookmarksReceiveAction
  | SectionUserMostFollowedTagsRequestAction
  | SectionUserMostFollowedTagsReceiveAction;
