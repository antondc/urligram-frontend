import { Dispatch } from 'redux';

import { ReceiveBookmarksResponse } from 'Root/src/shared/redux/modules/Bookmarks/bookmarks.types';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

const bookmarksSerializerByKey = (data) =>
  data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadBookmarks = () => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response = await HttpClient.get<ReceiveBookmarksResponse>('/bookmarks');

    const bookmarksByKey = {
      byKey: bookmarksSerializerByKey(response.data),
    };

    dispatch(requestBookmarks());
    dispatch(receiveBookmarks(bookmarksByKey));

    return;
  }

  const response = await HttpClient.get('/bookmarks');
  const bookmarksByKey = bookmarksSerializerByKey(response.data);

  const result = {
    Bookmarks: {
      byKey: bookmarksByKey,
    },
  };

  return result;
};
