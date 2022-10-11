import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadByLinkSession } from 'Modules/Bookmarks/actions/bookmarkLoadByLinkSession';
import { selectBookmarksCurrent } from 'Modules/Bookmarks/selectors/selectBookmarksCurrent';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { notesLoadByLinkId } from 'Modules/Notes/actions/notesLoadByLinkId';
import { selectNotes } from 'Modules/Notes/selectors/selectNotes';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamLinkId } from 'Modules/Routes/selectors/selectCurrentRouteParamLinkId';
import { usersLoadByLinkId } from 'Modules/Users/actions/usersLoadByLinkId';
import { selectUsersCurrent } from 'Modules/Users/selectors/selectUsersCurrent';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { Link as LinkUi } from './Link';

const Link: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarks = useSelector(selectBookmarksCurrent);
  const bookmark = bookmarks?.length ? bookmarks[0] : null;
  const linkId = useSelector(selectCurrentRouteParamLinkId);
  const link = useSelector((state: RootState) => selectLinkById(state, { id: linkId }));
  const notes = useSelector(selectNotes);
  const users = useSelector(selectUsersCurrent);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);

  useEffect(() => {
    if (!linkId) return;

    const asyncFunction = async () => {
      const bookmark = await dispatch(bookmarkLoadByLinkSession(linkId));
      if (!bookmark?.id) {
        history.push(`/${currentLanguageSlug}${Routes.Home.route}`);
      } else {
        dispatch(notesLoadByLinkId(linkId));
        dispatch(usersLoadByLinkId(linkId));
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

  return <LinkUi link={link} notes={notes} users={users} bookmark={bookmark} />;
};

export default Link;
