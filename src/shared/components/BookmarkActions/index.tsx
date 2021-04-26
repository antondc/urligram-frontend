import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkDelete } from 'Modules/Bookmarks/actions/bookmarkDelete';
import { BookmarkRelated } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { BookmarkActions as BookmarkActionsUi } from './BookmarkActions';

import './BookmarkActions.less';

interface Props {
  className?: string;
  linkId: number;
  bookmarkId?: number;
}

export const BookmarkActions: React.FC<Props> = ({ className, linkId, bookmarkId }) => {
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

    await dispatch(bookmarkCreate(data));
    setLoading(false);
  };

  const onBookmarkDelete = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;
    setLoading(true);

    await dispatch(
      bookmarkDelete({
        bookmarkId: linksSessionBookmark?.id || bookmarksSessionBookmark?.id,
        linkId: link?.id || parentBookmark?.linkId,
      })
    );
    setLoading(false);
  };

  return (
    <BookmarkActionsUi
      loading={loading}
      isOwnBookmark={isOwnBookmark}
      userBookmarkedLink={userBookmarkedLink}
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
      className={className}
    />
  );
};

export default BookmarkActions;
