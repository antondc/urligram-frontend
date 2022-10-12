import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkDelete } from 'Modules/Bookmarks/actions/bookmarkDelete';
import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { BookmarkRelated } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { notesLoadByLinkId } from 'Modules/Notes/actions/notesLoadByLinkId';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { usersLoadByLinkId } from 'Modules/Users/actions/usersLoadByLinkId';
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
  const onBookmarkGrab = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (userBookmarkedLink) return;

    setLoading(true);
    const bookmarkTags = parentBookmark?.tags?.map((item) => ({ tag: item.name }));

    const data = {
      title: parentBookmark?.title,
      url: parentBookmark?.url,
      isPrivate: parentBookmark?.isPrivate || false,
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
      console.log('Bookmarker.onBookmarkGrab.catch: ', error);
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
      if (!!listId) await dispatch(bookmarksLoadByListId(listId));
    } catch (error) {
      console.log('Bookmarker.onBookmarkDelete.catch: ', error);
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
