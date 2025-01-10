import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { userDelete } from 'Modules/Users/actions/userDelete';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { isDomAvailable } from '@antoniodcorrea/utils-frontend';
import { User as UserUi } from './User';

const User: React.FC = () => {
  const dispatch = useDispatch();

  const glossary = useSelector(selectCurrentGlossary);
  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const userIdIsSessionId = userId === session?.id;
  const listsLoading = useSelector(selectListsLoading) && isDomAvailable;
  const listsIds = useSelector(selectListsAllIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate({ unixTime: user?.createdAt, locale: currentLanguageSlug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const userPublicBookmarks = user?.bookmarksIds?.length - user.bookmarksPrivate;

  const onUserDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const confirmed = confirm(glossary.deleteConfirmMessage);

    if (confirmed) {
      await dispatch(userDelete());
      await dispatch(sessionLogOut());

      history.push(Routes.Home.route);

      return;
    }

    return;
  };

  useEffect(() => {
    if (!userId) return;

    dispatch(bookmarksLoadByUserId(userId, 5));
    dispatch(userLoad(userId, true));
    dispatch(listsLoadByUserId({ userId }));
  }, [session?.id]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <UserUi
      glossary={glossary}
      userIdIsSessionId={userIdIsSessionId}
      userId={userId}
      user={user}
      userPublicBookmarks={userPublicBookmarks}
      listsIds={listsIds}
      listsLoading={listsLoading}
      createdAtFormatted={createdAtFormatted}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      onUserDelete={onUserDelete}
    />
  );
};

export default User;
