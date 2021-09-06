import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { User as UserUi } from './User';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const User: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const userIdIsSessionId = userId === session?.id;
  const listsLoading = useSelector(selectListsLoading);
  const listsIds = useSelector(selectListsAllIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate({ unixTime: user?.createdAt, locale: currentLanguageSlug });
  const createdAtFormatted = date.getLocaleFormattedDate();

  useEffect(() => {
    dispatch(bookmarksLoadByUserId(userId, 5));
    dispatch(userLoad(userId));
  }, [session?.id]);

  return (
    <UserUi
      userIdIsSessionId={userIdIsSessionId}
      userId={userId}
      user={user}
      listsIds={listsIds}
      listsLoading={listsLoading}
      createdAtFormatted={createdAtFormatted}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
    />
  );
};

export default User;
