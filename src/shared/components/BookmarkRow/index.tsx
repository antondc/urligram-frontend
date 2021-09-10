import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectBookmarkTagsByLinkIdAndListId } from 'Modules/Bookmarks/selectors/selectBookmarkTagsByLinkIdAndListId';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { listNotificationViewed } from 'Modules/Notifications/actions/listNotificationViewed';
import { selectNotificationByBookmarkIdAndListId } from 'Modules/Notifications/selectors/selectNotificationByBookmarkIdAndListId';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkListsModalMount } from 'Modules/Ui/actions/bookmarkListsModalMount';
import { switchBookmarkActionButtonsMounted } from 'Modules/Ui/actions/switchBookmarkActionButtonsMounted';
import { switchBookmarkActionButtonsUnmounted } from 'Modules/Ui/actions/switchBookmarkActionButtonsUnmounted';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectBookmarkActionsIcons } from 'Modules/Ui/selectors/selectBookmarkActionsIcons';
import { selectBookmarkListsModalMounted } from 'Modules/Ui/selectors/selectBookmarkListsModalMounted';
import { selectUiScreenTypeIsDesktop } from 'Modules/Ui/selectors/selectUiScreenTypeIsDesktop';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { TIME_RECENTLY_CREATED_BOOKMARK } from 'Root/src/shared/constants';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { unixTimeElapsed } from 'Tools/utils/Date/unixTimeElapsed';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

interface Props {
  id: number;
  listId?: number;
  tagHrefPath?: string;
}

const BookmarkRow: React.FC<Props> = ({ id, listId, tagHrefPath = '' }) => {
  const dispatch = useDispatch();
  const slug = useSelector(selectCurrentLanguageSlug);
  const session = useSelector(selectSession);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId: id }));
  const timePassed = unixTimeElapsed(bookmark?.createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const date = new LocaleFormattedDate({ unixTime: bookmark?.createdAt, locale: slug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const sessionUserBookmarkId = bookmark?.bookmarksRelated?.find((item) => item?.userId === session?.id)?.id;
  const sessionUserBookmarkedLink = !!sessionUserBookmarkId;
  const sessionUserBookmark = useSelector((state: RootState) =>
    selectBookmarksById(state, { bookmarkId: sessionUserBookmarkId })
  );
  const bookmarkListsModalMounted = useSelector(selectBookmarkListsModalMounted);

  // If the bookmark is part of a list, display all tags from bookmarks sharing its linkId, when bookmark.userId is within list
  const tagsIfInList = useSelector((state: RootState) =>
    selectBookmarkTagsByLinkIdAndListId(state, { linkId: bookmark?.linkId, listId })
  );
  const tags = !!listId ? tagsIfInList : bookmark.tags;
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const uiScreenTypeIsDesktop = useSelector(selectUiScreenTypeIsDesktop);
  const bookmarkActionIcons = useSelector(selectBookmarkActionsIcons);
  const bookmarkActionIconsMounted = uiScreenTypeIsDesktop || bookmarkActionIcons?.bookmarkId === id;
  const bookmarkListNotification =
    listId &&
    useSelector((state: RootState) => selectNotificationByBookmarkIdAndListId(state, { listId, bookmarkId: id }));
  const viewPending = !!bookmarkListNotification?.viewPending;

  const onMobileBookmarkActionsIconClick = () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    dispatch(switchBookmarkActionButtonsMounted({ bookmarkId: id }));
  };

  const onMobileBookmarkActionsBackgroundClick = () => {
    dispatch(switchBookmarkActionButtonsUnmounted());
  };

  const onEdit = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!sessionUserBookmarkedLink) return;
    await dispatch(switchBookmarkUpdateModal({ mounted: true, bookmarkId: sessionUserBookmarkId }));
  };

  const onListsClick = () => {
    if (bookmarkListsModalMounted) return;

    dispatch(bookmarkListsModalMount({ bookmarkId: bookmark?.id }));
  };

  const bookmarkViewed = () => {
    if (!viewPending) return;

    dispatch(listNotificationViewed({ bookmarkId: bookmark?.id, listId }));
  };

  useEffect(() => {
    // If user has bookmarked this link, but it hasnt been retrieved yet from API, retrieve it
    if (!!sessionUserBookmarkedLink && !sessionUserBookmark?.id)
      dispatch(bookmarkLoadById({ bookmarkId: sessionUserBookmarkId }));
  }, [sessionUserBookmarkedLink]);

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
      id={id}
      listId={listId}
      bookmark={sessionUserBookmarkedLink ? sessionUserBookmark : bookmark}
      bookmarkActionIconsMounted={bookmarkActionIconsMounted}
      tags={tags}
      createdAtFormatted={createdAtFormatted}
      recentlyCreated={recentlyCreated}
      viewPending={viewPending}
      sessionUserBookmarkedLink={sessionUserBookmarkedLink}
      pathForTagLink={tagHrefPath}
      uiScreenTypeIsMobile={uiScreenTypeIsMobile}
      onEdit={onEdit}
      onListsClick={onListsClick}
      onMobileBookmarkActionsIconClick={onMobileBookmarkActionsIconClick}
      onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
      bookmarkViewed={bookmarkViewed}
    />
  );
};

export default BookmarkRow;
