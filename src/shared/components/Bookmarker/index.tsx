import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkDelete } from 'Modules/Bookmarks/actions/bookmarkDelete';
import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { BookmarkRelated } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Bookmarker as BookmarkerUi } from './Bookmarker';

import './Bookmarker.less';

interface Props {
  className?: string;
  linkId: number;
  listId?: number;
  bookmarkId?: number;
  onBookmarked?: () => void;
}

const Bookmarker: React.FC<Props> = ({ className, linkId, listId, bookmarkId, onBookmarked }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const link = useSelector((state: RootState) => selectLinkById(state, { id: linkId }));
  const [loading, setLoading] = useState<boolean>(false);
  const parentBookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));
  const bookmarksSessionBookmark: BookmarkRelated = parentBookmark?.bookmarksRelated?.find(
    (item) => item.userId === session?.id
  );
  const linksSessionBookmark: BookmarkRelated = link?.bookmarksRelated?.find((item) => item.userId === session?.id);
  const isOwnBookmark = session?.id === parentBookmark?.userId;
  const userBookmarkedLink =
    parentBookmark?.bookmarksRelated?.some((item) => item.userId === session?.id) || !!linksSessionBookmark?.id;

  const onBookmarkGrab = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (userBookmarkedLink) return;

    setLoading(true);
    const bookmarkTags = parentBookmark?.tags?.map((item) => ({ tag: item.name }));
    const linkTags = link?.tags?.map((item) => ({ tag: item.name }));

    const data = {
      title: parentBookmark?.title || link?.title,
      url: parentBookmark?.url || link?.url,
      isPrivate: parentBookmark?.isPrivate || false,
      tags: bookmarkTags || linkTags,
    };
    try {
      const { id: newBookmarkId } = await dispatch(bookmarkCreate(data));
      if (!!listId) await dispatch(listBookmarkCreate({ listId, bookmarkId: newBookmarkId }));
      onBookmarked && onBookmarked();
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
          bookmarkId: linksSessionBookmark?.id || bookmarksSessionBookmark?.id,
          linkId: link?.id || parentBookmark?.linkId,
        })
      );
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
      isOwnBookmark={isOwnBookmark}
      userBookmarkedLink={userBookmarkedLink}
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
    />
  );
};

export default Bookmarker;
