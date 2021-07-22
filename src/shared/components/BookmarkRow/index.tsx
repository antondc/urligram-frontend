import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectBookmarkTagsByLinkIdAndListId } from 'Modules/Bookmarks/selectors/selectBookmarkTagsByLinkIdAndListId';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { RootState } from 'Modules/rootType';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { bookmarkListsModalMount } from 'Modules/Ui/actions/bookmarkListsModalMount';
import { switchBookmarkActionButtonsMounted } from 'Modules/Ui/actions/switchBookmarkActionButtonsMounted';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectBookmarkActionsIcons } from 'Modules/Ui/selectors/selectBookmarkActionsIcons';
import { selectBookmarkListsModalMounted } from 'Modules/Ui/selectors/selectBookmarkListsModalMounted';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { TIME_RECENTLY_CREATED_BOOKMARK } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { unixTimeElapsed } from 'Tools/utils/Date/unixTimeElapsed';
import { switchBookmarkActionButtonsUnmounted } from '../../redux/modules/Ui/actions/switchBookmarkActionButtonsUnmounted';
import { selectUiScreenTypeIsDesktop } from '../../redux/modules/Ui/selectors/selectUiScreenTypeIsDesktop';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

interface Props {
  id: number;
  listId?: number;
}

const BookmarkRow: React.FC<Props> = ({ id, listId }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectSessionLoggedIn);
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
  const currentRoute = useSelector(selectCurrentRoute);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const currentPathname = useSelector(selectCurrentPathname);
  // If we are at Home page, we want tags to link to Bookmarks page
  const isHome = currentRoute?.name === Routes.Home.name;
  const pathNameIfHome = `/${currentLanguageSlug}/bookmarks`;
  const pathForTagLink = isHome ? pathNameIfHome : currentPathname;
  // If the bookmark is part of a list, display all tags from bookmarks sharing its linkId, when bookmark.userId is within list
  const tagsIfInList = useSelector((state: RootState) =>
    selectBookmarkTagsByLinkIdAndListId(state, { linkId: bookmark?.linkId, listId })
  );
  const tags = !!listId ? tagsIfInList : bookmark.tags;
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const uiScreenTypeIsDesktop = useSelector(selectUiScreenTypeIsDesktop);
  const bookmarkActionIcons = useSelector(selectBookmarkActionsIcons);
  const bookmarkActionIconsMounted = uiScreenTypeIsDesktop || bookmarkActionIcons?.bookmarkId === id;

  const onMobileBookmarkActionsIconClick = () => {
    dispatch(switchBookmarkActionButtonsMounted({ bookmarkId: id }));
  };

  const onMobileBookmarkActionsBackgroundClick = () => {
    dispatch(switchBookmarkActionButtonsUnmounted());
  };

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId: bookmark?.linkId, userId: session?.id }));
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
      onVote={onVote}
      recentlyCreated={recentlyCreated}
      sessionUserBookmarkedLink={sessionUserBookmarkedLink}
      pathForTagLink={pathForTagLink}
      uiScreenTypeIsMobile={uiScreenTypeIsMobile}
      onEdit={onEdit}
      onListsClick={onListsClick}
      onMobileBookmarkActionsIconClick={onMobileBookmarkActionsIconClick}
      onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
    />
  );
};

export default BookmarkRow;
