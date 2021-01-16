import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

const bookmarksSerializerByKey = (data) =>
  data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadBookmarks = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    dispatch(requestBookmarks());

    const { data }: ReceiveBookmarksResponse = await HttpClient.get('/bookmarks');

    const bookmarksByKey = {
      byKey: bookmarksSerializerByKey(data),
    };
    dispatch(receiveBookmarks(bookmarksByKey));

    return;
  }

  const { data }: ReceiveBookmarksResponse = await HttpClient.get('/bookmarks');
  const bookmarksByKey = bookmarksSerializerByKey(data);

  const result = {
    Bookmarks: {
      byKey: bookmarksByKey,
    },
  };

  return result;
};
