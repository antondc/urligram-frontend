import { BookmarksState } from '../Bookmarks/bookmarks.types';
import { ListsState } from '../Lists/lists.types';
import { TagsState } from '../Tags/tags.types';
import { UsersState } from '../Users/users.types';

export const SECTIONS_MOST_POPULAR_LISTS_LOAD_REQUEST = 'SECTIONS_MOST_POPULAR_LISTS_LOAD_REQUEST';
export const SECTIONS_MOST_POPULAR_LISTS_LOAD_SUCCESS = 'SECTIONS_MOST_POPULAR_LISTS_LOAD_SUCCESS';
export const SECTIONS_NEW_LISTS_REQUEST = 'SECTIONS_NEW_LISTS_REQUEST';
export const SECTIONS_NEW_LISTS_SUCCESS = 'SECTIONS_NEW_LISTS_SUCCESS';
export const SECTIONS_MOST_FOLLOWED_USERS_REQUEST = 'SECTIONS_MOST_FOLLOWED_USERS_REQUEST';
export const SECTIONS_MOST_FOLLOWED_USERS_SUCCESS = 'SECTIONS_MOST_FOLLOWED_USERS_SUCCESS';
export const SECTIONS_NEW_USERS_REQUEST = 'SECTIONS_NEW_USERS_REQUEST';
export const SECTIONS_NEW_USERS_SUCCESS = 'SECTIONS_NEW_USERS_SUCCESS';
export const SECTIONS_MY_LISTS_REQUEST = 'SECTIONS_MY_LISTS_REQUEST';
export const SECTIONS_MY_LISTS_SUCCESS = 'SECTIONS_MY_LISTS_SUCCESS';
export const SECTIONS_FOLLOWING_LISTS_REQUEST = 'SECTIONS_FOLLOWING_LISTS_REQUEST';
export const SECTIONS_FOLLOWING_LISTS_SUCCESS = 'SECTIONS_FOLLOWING_LISTS_SUCCESS';
export const SECTIONS_MY_TAGS_REQUEST = 'SECTIONS_MY_TAGS_REQUEST';
export const SECTIONS_MY_TAGS_SUCCESS = 'SECTIONS_MY_TAGS_SUCCESS';
export const SECTIONS_FOLLOWING_USERS_REQUEST = 'SECTIONS_FOLLOWING_USERS_REQUEST';
export const SECTIONS_FOLLOWING_USERS_SUCCESS = 'SECTIONS_FOLLOWING_USERS_SUCCESS';
export const SECTIONS_MOST_USED_TAGS_REQUEST = 'SECTIONS_MOST_USED_TAGS_REQUEST';
export const SECTIONS_MOST_USED_TAGS_SUCCESS = 'SECTIONS_MOST_USED_TAGS_SUCCESS';
export const SECTIONS_USER_LISTS_REQUEST = 'SECTIONS_USER_LISTS_REQUEST';
export const SECTIONS_USER_LISTS_SUCCESS = 'SECTIONS_USER_LISTS_SUCCESS';
export const SECTIONS_FOLLOWERS_USERS_REQUEST = 'SECTIONS_FOLLOWERS_USERS_REQUEST';
export const SECTIONS_FOLLOWERS_USERS_SUCCESS = 'SECTIONS_FOLLOWERS_USERS_SUCCESS';
export const SECTIONS_SIMILAR_LISTS_REQUEST = 'SECTIONS_SIMILAR_LISTS_REQUEST';
export const SECTIONS_SIMILAR_LISTS_SUCCESS = 'SECTIONS_SIMILAR_LISTS_SUCCESS';
export const SECTIONS_USERS_IN_THIS_LIST_REQUEST = 'SECTIONS_USERS_IN_THIS_LIST_REQUEST';
export const SECTIONS_USERS_IN_THIS_LIST_SUCCESS = 'SECTIONS_USERS_IN_THIS_LIST_SUCCESS';
export const SECTIONS_TAGS_IN_THIS_LIST_REQUEST = 'SECTIONS_TAGS_IN_THIS_LIST_REQUEST';
export const SECTIONS_TAGS_IN_THIS_LIST_SUCCESS = 'SECTIONS_TAGS_IN_THIS_LIST_SUCCESS';
export const SECTIONS_MY_RECENT_BOOKMARKS_REQUEST = 'SECTIONS_MY_RECENT_BOOKMARKS_REQUEST';
export const SECTIONS_MY_RECENT_BOOKMARKS_SUCCESS = 'SECTIONS_MY_RECENT_BOOKMARKS_SUCCESS';
export const SECTIONS_USER_MOST_USED_TAGS_REQUEST = 'SECTIONS_USER_MOST_USED_TAGS_REQUEST';
export const SECTIONS_USER_MOST_USED_TAGS_SUCCESS = 'SECTIONS_USER_MOST_USED_TAGS_SUCCESS';

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
  type: typeof SECTIONS_MOST_POPULAR_LISTS_LOAD_REQUEST;
  payload: Partial<SectionsState>;
}

interface ReceiveMostPopularListsAction {
  type: typeof SECTIONS_MOST_POPULAR_LISTS_LOAD_SUCCESS;
  payload: SectionsState;
}

interface SectionNewListsRequestAction {
  type: typeof SECTIONS_NEW_LISTS_REQUEST;
  payload: SectionsState;
}

interface SectionNewListsSuccessAction {
  type: typeof SECTIONS_NEW_LISTS_SUCCESS;
  payload: SectionsState;
}

interface SectionMostFollowedUsersRequestAction {
  type: typeof SECTIONS_MOST_FOLLOWED_USERS_REQUEST;
  payload: SectionsState;
}

interface SectionMostFollowedUsersSuccessAction {
  type: typeof SECTIONS_MOST_FOLLOWED_USERS_SUCCESS;
  payload: SectionsState;
}

interface SectionNewUsersRequestAction {
  type: typeof SECTIONS_NEW_USERS_REQUEST;
  payload: SectionsState;
}

interface SectionNewUsersSuccessAction {
  type: typeof SECTIONS_NEW_USERS_SUCCESS;
  payload: SectionsState;
}

interface SectionMyListsRequestAction {
  type: typeof SECTIONS_MY_LISTS_REQUEST;
  payload: SectionsState;
}

interface SectionMyListsSuccessAction {
  type: typeof SECTIONS_MY_LISTS_SUCCESS;
  payload: SectionsState;
}

interface SectionFollowingListsRequestAction {
  type: typeof SECTIONS_FOLLOWING_LISTS_REQUEST;
  payload: SectionsState;
}

interface SectionFollowingListsSuccessAction {
  type: typeof SECTIONS_FOLLOWING_LISTS_SUCCESS;
  payload: SectionsState;
}

interface SectionMyTagsRequestAction {
  type: typeof SECTIONS_MY_TAGS_REQUEST;
  payload: SectionsState;
}

interface SectionMyTagsSuccessAction {
  type: typeof SECTIONS_MY_TAGS_SUCCESS;
  payload: SectionsState;
}

interface SectionFollowingUsersRequestAction {
  type: typeof SECTIONS_FOLLOWING_USERS_REQUEST;
  payload: SectionsState;
}

interface SectionFollowingUsersSuccessAction {
  type: typeof SECTIONS_FOLLOWING_USERS_SUCCESS;
  payload: SectionsState;
}

interface SectionMostFollowedTagsRequestAction {
  type: typeof SECTIONS_MOST_USED_TAGS_REQUEST;
  payload: SectionsState;
}

interface SectionMostFollowedTagsSuccessAction {
  type: typeof SECTIONS_MOST_USED_TAGS_SUCCESS;
  payload: SectionsState;
}

interface SectionUserListsRequestAction {
  type: typeof SECTIONS_USER_LISTS_REQUEST;
  payload: SectionsState;
}

interface SectionUserListsSuccessAction {
  type: typeof SECTIONS_USER_LISTS_SUCCESS;
  payload: SectionsState;
}

interface SectionFollowersUsersRequestAction {
  type: typeof SECTIONS_FOLLOWERS_USERS_REQUEST;
  payload: SectionsState;
}

interface SectionFollowersUsersSuccessAction {
  type: typeof SECTIONS_FOLLOWERS_USERS_SUCCESS;
  payload: SectionsState;
}

interface SectionSimilarListsRequestAction {
  type: typeof SECTIONS_SIMILAR_LISTS_REQUEST;
  payload: SectionsState;
}

interface SectionSimilarListsSuccessAction {
  type: typeof SECTIONS_SIMILAR_LISTS_SUCCESS;
  payload: SectionsState;
}

interface SectionUsersInThisListRequestAction {
  type: typeof SECTIONS_USERS_IN_THIS_LIST_REQUEST;
  payload: SectionsState;
}

interface SectionUsersInThisListSuccessAction {
  type: typeof SECTIONS_USERS_IN_THIS_LIST_SUCCESS;
  payload: SectionsState;
}

interface SectionTagsInThisListRequestAction {
  type: typeof SECTIONS_TAGS_IN_THIS_LIST_REQUEST;
  payload: SectionsState;
}

interface SectionTagsInThisListSuccessAction {
  type: typeof SECTIONS_TAGS_IN_THIS_LIST_SUCCESS;
  payload: SectionsState;
}

interface SectionMyRecentBookmarksRequestAction {
  type: typeof SECTIONS_MY_RECENT_BOOKMARKS_REQUEST;
  payload: SectionsState;
}

interface SectionMyRecentBookmarksSuccessAction {
  type: typeof SECTIONS_MY_RECENT_BOOKMARKS_SUCCESS;
  payload: SectionsState;
}

interface SectionUserMostFollowedTagsRequestAction {
  type: typeof SECTIONS_USER_MOST_USED_TAGS_REQUEST;
  payload: SectionsState;
}

interface SectionUserMostFollowedTagsSuccessAction {
  type: typeof SECTIONS_USER_MOST_USED_TAGS_SUCCESS;
  payload: SectionsState;
}

export type SectionsActions =
  | RequestMostPopularListsAction
  | ReceiveMostPopularListsAction
  | SectionNewListsRequestAction
  | SectionNewListsSuccessAction
  | SectionMostFollowedUsersRequestAction
  | SectionMostFollowedUsersSuccessAction
  | SectionNewUsersRequestAction
  | SectionNewUsersSuccessAction
  | SectionMyListsRequestAction
  | SectionMyListsSuccessAction
  | SectionFollowingListsRequestAction
  | SectionFollowingListsSuccessAction
  | SectionMyTagsRequestAction
  | SectionMyTagsSuccessAction
  | SectionFollowingUsersRequestAction
  | SectionFollowingUsersSuccessAction
  | SectionMostFollowedTagsRequestAction
  | SectionMostFollowedTagsSuccessAction
  | SectionUserListsRequestAction
  | SectionUserListsSuccessAction
  | SectionFollowersUsersRequestAction
  | SectionFollowersUsersSuccessAction
  | SectionSimilarListsRequestAction
  | SectionSimilarListsSuccessAction
  | SectionUsersInThisListRequestAction
  | SectionUsersInThisListSuccessAction
  | SectionTagsInThisListRequestAction
  | SectionTagsInThisListSuccessAction
  | SectionMyRecentBookmarksRequestAction
  | SectionMyRecentBookmarksSuccessAction
  | SectionUserMostFollowedTagsRequestAction
  | SectionUserMostFollowedTagsSuccessAction;
