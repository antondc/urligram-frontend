import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { stringify } from 'qs';

import { ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

const bookmarksSerializerByKey = (data) =>
  data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadBookmarks = ({ query }: RequestParameters = {}): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  const APIBaseEndpoint = '/bookmarks';

  if (isBrowser) {
    dispatch(requestBookmarks());

    const { data }: ReceiveBookmarksResponse = await HttpClient.get(APIBaseEndpoint + window.location.search);

    const bookmarksByKey = {
      byKey: bookmarksSerializerByKey(data),
    };
    dispatch(receiveBookmarks(bookmarksByKey));

    return;
  }

  const { data }: ReceiveBookmarksResponse = await HttpClient.get(APIBaseEndpoint + '?' + stringify(query));
  const bookmarksByKey = bookmarksSerializerByKey(data);

  const result = {
    Bookmarks: {
      byKey: bookmarksByKey,
    },
  };

  return result;
};
