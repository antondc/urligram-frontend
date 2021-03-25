import { receiveBookmarks } from 'Modules/Bookmarks/actions/receiveBookmarks';
import { BookmarksActions, BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
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

    const { data } = await HttpClient.get<void, BookmarksGetResponse>(
      `/users/${sessionId}/bookmarks?page[size]=5&sort=-createdat`
    );
    const { Sections: sectionsAfterApi, Bookmarks: bookmarksAfterApi } = getState();
    const bookmarksArray = data.map((item) => item.attributes);

    dispatch(
      receiveBookmarks({
        ...bookmarksAfterApi,
        byKey: {
          ...bookmarksAfterApi.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
      })
    );

    dispatch(
      sectionsMyRecentBookmarksSuccess({
        ...sectionsAfterApi,
        MyRecentBookmarks: {
          ...sectionsAfterApi.MyRecentBookmarks,
          currentIds: data.map((item) => item.id),
          loading: false,
        },
      })
    );

    return bookmarksArray;
  } catch (err) {
    throw new Error(err);
  }
};
