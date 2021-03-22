import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadBookmarksSuccess } from 'Modules/Bookmarks/actions/loadBookmarksSuccess';
import { BookmarkState, ReceiveBookmarkItem, ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsMyRecentBookmarksReceive } from './sectionsMyRecentBookmarksReceive';
import { sectionsMyRecentBookmarksRequest } from './sectionsMyRecentBookmarksRequest';

export const sectionsMyRecentBookmarksLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  try {
    dispatch(sectionsMyRecentBookmarksRequest());

    const { data }: ReceiveBookmarksResponse = await HttpClient.get(
      `/users/${sessionId}/bookmarks?page[size]=5&sort=-createdAt`
    );

    const myBookmarksByKey = {
      byKey: serializerFromArrayToByKey<ReceiveBookmarkItem, BookmarkState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(loadBookmarksSuccess(myBookmarksByKey));

    dispatch(
      sectionsMyRecentBookmarksReceive({
        MyRecentBookmarks: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
