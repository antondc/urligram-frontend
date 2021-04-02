import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkDelete } from 'Modules/Bookmarks/actions/bookmarkDelete';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { BookmarkButton as BookmarkButtonUi } from './BookmarkButton';

import './BookmarkButton.less';

interface Props {
  linkId: number;
  bookmarkId: number;
  className?: string;
}

export const BookmarkButton: React.FC<Props> = ({ linkId, bookmarkId, className }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const link = useSelector((state: RootState) => selectLinkById(state, { id: linkId }));
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { id: bookmarkId }));
  const isOwnBookmark = session?.id === bookmark?.userId;
  const userBookmarkedLink = bookmark?.users?.includes(session?.id);
  const loading = link?.loading || bookmark?.loading;

  const onBookmarkGrab = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (userBookmarkedLink) return;

    const data = {
      title: bookmark?.title,
      url: bookmark?.url,
      isPrivate: bookmark?.isPrivate,
      tags: bookmark?.tags?.map((item) => ({ tag: item.name })),
      bookmarkId: bookmark?.id,
    };

    await dispatch(bookmarkCreate(data));
  };

  const onBookmarkDelete = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;
    const link = await dispatch(linkLoadById(linkId));
    const bookmarkId = link?.bookmarks.find((item) => item.userId === session?.id);

    await dispatch(bookmarkDelete({ bookmarkId: bookmarkId?.id, linkId, userId: session?.id }));
  };

  const onEdit = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;
    await dispatch(switchBookmarkUpdateModal({ mounted: true, bookmarkId: bookmarkId }));
  };

  return (
    <BookmarkButtonUi
      loading={loading}
      isOwnBookmark={isOwnBookmark}
      userBookmarkedLink={userBookmarkedLink}
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
      onEdit={onEdit}
      className={className}
    />
  );
};

export default BookmarkButton;
