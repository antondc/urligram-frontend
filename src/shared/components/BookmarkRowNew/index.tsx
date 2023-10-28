import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { bookmarkUpdate } from 'Modules/Bookmarks/actions/bookmarkUpdate';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectBookmarkTagsByLinkIdAndListId } from 'Modules/Bookmarks/selectors/selectBookmarkTagsByLinkIdAndListId';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectListsByUserIdAll } from 'Modules/Lists/selectors/selectListsByUserIdAll';
import { listNotificationViewed } from 'Modules/Notifications/actions/listNotificationViewed';
import { selectNotificationByBookmarkIdAndListId } from 'Modules/Notifications/selectors/selectNotificationByBookmarkIdAndListId';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkListsModalMount } from 'Modules/Ui/actions/bookmarkListsModalMount';
import { bookmarkListsModalUnmount } from 'Modules/Ui/actions/bookmarkListsModalUnmount';
import { switchBookmarkActionButtonsMounted } from 'Modules/Ui/actions/switchBookmarkActionButtonsMounted';
import { switchBookmarkActionButtonsUnmounted } from 'Modules/Ui/actions/switchBookmarkActionButtonsUnmounted';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectBookmarkActionsIcons } from 'Modules/Ui/selectors/selectBookmarkActionsIcons';
import { selectUiScreenTypeIsDesktop } from 'Modules/Ui/selectors/selectUiScreenTypeIsDesktop';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { TIME_RECENTLY_CREATED_BOOKMARK } from 'Root/src/shared/constants';
import { LocaleFormattedDate, unixTimeElapsed, URLWrapper } from '@antoniodcorrea/utils';
import { BookmarkRowNew as BookmarkRowUi } from './BookmarkRowNew';

interface Props {
  id: number;
  listId?: number;
  tagsHref?: string;
  withInfoButton?: boolean;
}

const BookmarkRowNew: React.FC<Props> = ({ id, listId, tagsHref = '', withInfoButton = true }) => {
  const dispatch = useDispatch();
  const [publicLoading, setPublicLoading] = useState<boolean>(false);
  const slug = useSelector(selectCurrentLanguageSlug);
  const session = useSelector(selectSession);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId: id }));
  const timePassed = unixTimeElapsed(bookmark?.createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const date = new LocaleFormattedDate({ unixTime: bookmark?.createdAt, locale: slug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const sessionUserBookmarkedLink = bookmark?.userId === session?.id;
  const domain = new URLWrapper(bookmark?.url).getDomain();

  // If the bookmark is part of a list, display all tags from bookmarks sharing its linkId, when bookmark.userId is within list
  const tagsIfInList = useSelector((state: RootState) =>
    selectBookmarkTagsByLinkIdAndListId(state, { linkId: bookmark?.linkId, listId })
  );
  const tags = !!listId ? tagsIfInList : bookmark?.tags;
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const uiScreenTypeIsDesktop = useSelector(selectUiScreenTypeIsDesktop);
  const bookmarkActionIcons = useSelector(selectBookmarkActionsIcons);
  const bookmarkActionIconsMounted = uiScreenTypeIsDesktop || bookmarkActionIcons?.bookmarkId === id;
  const bookmarkListNotification =
    listId &&
    useSelector((state: RootState) => selectNotificationByBookmarkIdAndListId(state, { listId, bookmarkId: id }));
  const viewPending = !!bookmarkListNotification?.viewPending;
  // If the bookmark is in one of my lists as admin or editor, render the lists modal
  const userLists = useSelector((state: RootState) => selectListsByUserIdAll(state, { userId: session?.id }));
  // BookmarkIds of all bookmarks in any of my lists
  const bookmarksIdsOfMyLists = new Set(userLists?.map((item) => item?.bookmarksIds).flat());
  const bookmarkIdInAnyOfMyLists = bookmarksIdsOfMyLists.has(id);

  const onMobileBookmarkActionsIconClick = () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!sessionUserBookmarkedLink) return;
    dispatch(switchBookmarkActionButtonsMounted({ bookmarkId: id }));
  };

  const onMobileBookmarkActionsBackgroundClick = () => {
    dispatch(switchBookmarkActionButtonsUnmounted());
  };

  const onEdit = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!sessionUserBookmarkedLink) return;
    await dispatch(switchBookmarkUpdateModal({ mounted: true, bookmarkId: id }));
  };

  const onListsClick = () => {
    dispatch(bookmarkListsModalUnmount());
    dispatch(bookmarkListsModalMount({ bookmarkId: bookmark?.id }));
  };

  const onPublicClick = async () => {
    setPublicLoading(true);
    const tagsFormatted = bookmark?.tags?.map((item) => ({ tag: item.name })) || [];
    const isPublicReverted = !bookmark?.isPublic;

    try {
      const data = {
        bookmarkId: bookmark?.id,
        title: bookmark?.title,
        isPublic: isPublicReverted,
        order: bookmark?.order,
        tags: tagsFormatted,
        notes: bookmark?.notes,
      };

      await dispatch(bookmarkUpdate(data));
    } finally {
      setPublicLoading(false);
      await bookmarkLoadById({ bookmarkId: bookmark?.id });
    }
  };

  const bookmarkViewed = () => {
    if (!viewPending) return;

    dispatch(listNotificationViewed({ bookmarkId: bookmark?.id, listId }));
  };

  useEffect(() => {
    // If we are on desktop, hide icons by default
    uiScreenTypeIsMobile && dispatch(switchBookmarkActionButtonsUnmounted());
  }, [uiScreenTypeIsMobile]);

  if (!id) return null;

  // TODO: confirm that there are no cases where we need to load the bookmark again
  // useEffect(() => {
  //   if (!!sessionUserBookmarkedLink) dispatch(bookmarkLoadById({ bookmarkId: sessionUserBookmarkId }));
  // }, [sessionUserBookmarkId]);

  return (
    <BookmarkRowUi
      listId={listId}
      withInfoButton={withInfoButton}
      bookmark={bookmark}
      bookmarkActionIconsMounted={bookmarkActionIconsMounted}
      tags={tags}
      domain={domain}
      createdAtFormatted={createdAtFormatted}
      recentlyCreated={recentlyCreated}
      viewPending={viewPending}
      sessionUserBookmarkedLink={sessionUserBookmarkedLink}
      tagsHref={tagsHref}
      uiScreenTypeIsMobile={uiScreenTypeIsMobile}
      onEdit={onEdit}
      onListsClick={onListsClick}
      onMobileBookmarkActionsIconClick={onMobileBookmarkActionsIconClick}
      onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
      bookmarkViewed={bookmarkViewed}
      bookmarkIdInAnyOfMyLists={bookmarkIdInAnyOfMyLists}
      publicLoading={publicLoading}
      onPublicClick={onPublicClick}
    />
  );
};

export default BookmarkRowNew;
