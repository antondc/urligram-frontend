import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkDelete } from 'Modules/Bookmarks/actions/bookmarkDelete';
import { bookmarksLoad } from 'Modules/Bookmarks/actions/bookmarksLoad';
import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { BookmarkRelated } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { notesLoadByLinkId } from 'Modules/Notes/actions/notesLoadByLinkId';
import { RootState } from 'Modules/rootType';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { usersLoadByLinkId } from 'Modules/Users/actions/usersLoadByLinkId';
import { Routes } from 'Router/routes';
import { noop } from '@antoniodcorrea/utils';
import { Bookmarker as BookmarkerUi } from './Bookmarker';

import './Bookmarker.less';

interface Props {
  className?: string;
  listId?: number;
  bookmarkId?: number;
  onBookmarked?: () => void;
}

const Bookmarker: React.FC<Props> = ({ className, listId, bookmarkId, onBookmarked }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const [loading, setLoading] = useState<boolean>(false);
  const parentBookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));
  const bookmarksSessionBookmark: BookmarkRelated = parentBookmark?.bookmarksRelated?.find(
    (item) => item.userId === session?.id
  );
  const userBookmarkedLink = session?.id === parentBookmark?.userId;
  const currentRoute = useSelector(selectCurrentRoute);
  const currentParams = useSelector(selectCurrentRouteParams);

  const onBookmarkGrab = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (userBookmarkedLink) return;

    setLoading(true);
    const bookmarkTags = parentBookmark?.tags?.map((item) => ({ tag: item.name }));

    const data = {
      title: parentBookmark?.title,
      url: parentBookmark?.url,
      isPublic: !!parentBookmark?.isPublic,
      tags: bookmarkTags,
      notes: null,
    };
    try {
      const { id: newBookmarkId } = await dispatch(bookmarkCreate(data));
      if (!!listId) await dispatch(listBookmarkCreate({ listId, bookmarkId: newBookmarkId }));
      onBookmarked && onBookmarked();
      dispatch(notesLoadByLinkId({ linkId: parentBookmark.linkId }));
      dispatch(usersLoadByLinkId({ linkId: parentBookmark.linkId }));
    } catch (error) {
      noop();
    } finally {
      setLoading(false);
    }
  };

  const onBookmarkDelete = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;
    setLoading(true);

    try {
      await dispatch(
        bookmarkDelete({
          bookmarkId: bookmarksSessionBookmark?.id,
          linkId: parentBookmark?.linkId,
        })
      );
      dispatch(listsLoadByUserId({ userId: parentBookmark?.userId, rawData: true }));
      dispatch(notesLoadByLinkId({ linkId: parentBookmark.linkId }));
      dispatch(usersLoadByLinkId({ linkId: parentBookmark.linkId }));

      if (currentRoute.name === Routes.List.name && listId) {
        await dispatch(bookmarksLoadByListId(listId));
      } else if (currentRoute.name === Routes.UserBookmarks.name || currentRoute.name === Routes.Home.name) {
        await dispatch(bookmarksLoad());
      } else if (currentRoute.name === Routes.User.name && currentParams.userId) {
        await dispatch(bookmarksLoadByUserId(currentParams.userId));
      }
    } catch (error) {
      noop();
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookmarkerUi
      className={className}
      loading={loading}
      userBookmarkedLink={userBookmarkedLink}
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
    />
  );
};

export default Bookmarker;
