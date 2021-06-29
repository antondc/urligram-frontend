import { bookmarksLoadSuccess } from 'Modules/Bookmarks/actions/bookmarksLoadSuccess';
import { BookmarksActions, BookmarksGetApiResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsMyRecentBookmarksRequest } from './sectionsMyRecentBookmarksRequest';
import { sectionsMyRecentBookmarksSuccess } from './sectionsMyRecentBookmarksSuccess';

export const sectionsMyRecentBookmarksLoad = (
  sessionId: string
): AppThunk<Promise<BookmarkState[]>, BookmarksActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<BookmarkState[]> => {
  const { Sections: sectionsBeforeApi } = getState();
  try {
    dispatch(
      sectionsMyRecentBookmarksRequest({
        ...sectionsBeforeApi,
        MyRecentBookmarks: {
          ...sectionsBeforeApi.MyRecentBookmarks,
          loading: true,
        },
      })
    );

    const { data } = await HttpClient.get<void, BookmarksGetApiResponse>(
      `/users/${sessionId}/bookmarks?page[size]=5&sort=-createdAt`
    );
    const { Sections: sectionsAfterApi, Bookmarks: bookmarksAfterApi } = getState();
    const bookmarksArray = data?.map((item) => item.attributes);

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterApi,
        byKey: {
          ...bookmarksAfterApi.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
        loading: false,
      })
    );

    dispatch(
      sectionsMyRecentBookmarksSuccess({
        ...sectionsAfterApi,
        MyRecentBookmarks: {
          ...sectionsAfterApi.MyRecentBookmarks,
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      })
    );

    return bookmarksArray;
  } catch (error) {
    throw error;
  }
};
