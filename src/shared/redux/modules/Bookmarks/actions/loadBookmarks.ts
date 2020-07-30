import { Dispatch } from 'redux';
import { ReceiveBookmarksResponse } from 'Root/src/shared/redux/modules/Bookmarks/bookmarks.types';
import { requestBookmarks } from './requestBookmarks';
import { receiveBookmarks } from './receiveBookmarks';
import bookmarks from 'Modules/Bookmarks/bookmarks.data.json';

export const loadBookmarks = () => {
  if (isBrowser) {
    return (dispatch: Dispatch) => {
      const response: ReceiveBookmarksResponse = bookmarks;

      dispatch(requestBookmarks());
      dispatch(receiveBookmarks(response.data.Bookmarks));
    };
  }

  const response: ReceiveBookmarksResponse = bookmarks;

  return response.data;
};
