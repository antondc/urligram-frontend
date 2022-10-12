import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadByLinkSession } from 'Modules/Bookmarks/actions/bookmarkLoadByLinkSession';
import { selectBookmarksCurrent } from 'Modules/Bookmarks/selectors/selectBookmarksCurrent';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { notesLoadByLinkId } from 'Modules/Notes/actions/notesLoadByLinkId';
import { selectNotes } from 'Modules/Notes/selectors/selectNotes';
import { selectNotesMetaSort } from 'Modules/Notes/selectors/selectNotesMetaSort';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamLinkId } from 'Modules/Routes/selectors/selectCurrentRouteParamLinkId';
import { usersLoadByLinkId } from 'Modules/Users/actions/usersLoadByLinkId';
import { selectUsersCurrent } from 'Modules/Users/selectors/selectUsersCurrent';
import { selectCurrentRouteQueryParamSort } from 'Root/src/shared/redux/modules/Routes/selectors/selectCurrentRouteQueryParamSort';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { Link as LinkUi } from './Link';

const Link: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarks = useSelector(selectBookmarksCurrent);
  const bookmark = bookmarks?.length ? bookmarks[0] : null;
  const linkId = useSelector(selectCurrentRouteParamLinkId);
  const notes = useSelector(selectNotes);
  const users = useSelector(selectUsersCurrent);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectCurrentRouteQueryParamSort);
  const sortNotes = useSelector(selectNotesMetaSort);

  useEffect(() => {
    if (!linkId) return;

    const asyncFunction = async () => {
      const bookmark = await dispatch(bookmarkLoadByLinkSession(linkId));
      if (!bookmark?.id) {
        history.push(`/${currentLanguageSlug}${Routes.Home.route}`);
      }
    };

    asyncFunction();
  }, [linkId]);

  /*
    On bookmark removal, bookmark value will be updated
    We try to retrieve the latest bookmark for this link
    If it doesnt exist, return to Home
  */
  useEffect(() => {
    if (!linkId) return;

    const asyncFunction = async () => {
      try {
        await dispatch(bookmarkLoadByLinkSession(linkId));
      } catch (error) {
        history.push(`/${currentLanguageSlug}${Routes.Home.route}`);
      }
    };

    asyncFunction();
  }, [bookmark?.id]);

  useEffect(() => {
    dispatch(notesLoadByLinkId(linkId));
    dispatch(usersLoadByLinkId(linkId));
  }, [sort]);

  return <LinkUi notes={notes} users={users} bookmark={bookmark} url={url} sort={sort || sortNotes} />;
};

export default Link;
