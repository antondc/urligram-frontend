import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { ListState } from 'Modules/Lists/lists.types';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { UserVisitor as UserVisitorUi } from './UserVisitor';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const UserVisitor: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const popularLists = useSelector(selectPopularLists);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const popularListLoading = useSelector(selectPopularListsLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadPopularLists());
    dispatch(loadBookmarksByUserId(userId));
  }, [userId]);

  return (
    <UserVisitorUi
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      popularLists={popularLists}
      popularListLoading={popularListLoading}
    />
  );
};

export default UserVisitor;
