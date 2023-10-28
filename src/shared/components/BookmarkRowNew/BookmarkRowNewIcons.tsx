import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Public from 'Assets/svg/earth.svg';
import EditCircle from 'Assets/svg/editCircle.svg';
import Info from 'Assets/svg/info.svg';
import List from 'Assets/svg/list.svg';
import A from 'Components/A';
import BookmarkerNew from 'Components/BookmarkerNew';
import BookmarkListsPopOverOrSheet from 'Components/BookmarkListsPopOverOrSheet';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Fade, FadeInOut, Spinner } from '@antoniodcorrea/components';

import './BookmarkRowNewIcons.less';

interface BookmarkRowNewIcons extends BookmarkState {
  bookmark: Partial<BookmarkState>;
  listId?: number;
  withInfoButton: boolean;
  tags: TagState[];
  bookmarkActionIconsMounted: boolean;
  sessionUserBookmarkedLink: boolean;
  bookmarkIdInAnyOfMyLists: boolean;
  createdAtFormatted: string;
  pathForTagLink: string;
  uiScreenTypeIsMobile: boolean;
  onEdit: () => void;
  onListsClick: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
  publicLoading: boolean;
  onPublicClick: () => void;
}

export const BookmarkRowNewIcons: React.FC<Partial<BookmarkRowNewIcons>> = ({
  bookmark,
  listId,
  withInfoButton,
  bookmarkActionIconsMounted,
  sessionUserBookmarkedLink,
  uiScreenTypeIsMobile,
  onEdit,
  onListsClick,
  onMobileBookmarkActionsBackgroundClick,
  publicLoading,
  onPublicClick,
}) => (
  <div className="BookmarkRowNewIcons" data-test-id="BookmarkRowNewIcons">
    <div
      className={
        'BookmarkRowNewIcons-actionsIconsWrapper' +
        (bookmarkActionIconsMounted ? ' BookmarkRowNewIcons-actionsIconsWrapper--mounted' : '')
      }
      onClick={onMobileBookmarkActionsBackgroundClick}
    >
      <Fade
        className="BookmarkRowNewIcons-actionsIconsBackground"
        onClick={onMobileBookmarkActionsBackgroundClick}
        speed="normal"
        mounted={uiScreenTypeIsMobile && bookmarkActionIconsMounted}
      >
        <Cross className="BookmarkRowNewIcons-actionsIconsBackgroundCloseIcon" />
      </Fade>
      <Fade
        className="BookmarkRowNewIcons-actionsIcons"
        mounted={bookmarkActionIconsMounted}
        speed="fastest"
        direction="right"
        appear
        disabled={!uiScreenTypeIsMobile}
        unmountOnExit={false}
      >
        {withInfoButton && (
          <A
            className="BookmarkRowNewIcons-iconWrapper"
            href={`link/${bookmark?.linkId}`}
            styled={false}
            scrollBeforeNavigate
          >
            <Info className="BookmarkRowNewIcons-icon BookmarkRowNewIcons-iconInfo" />
          </A>
        )}
        {sessionUserBookmarkedLink && (
          <FadeInOut className="BookmarkRowNewIcons-iconWrapper" valueToUpdate={publicLoading} appear speed="fast">
            {publicLoading ? (
              <Spinner className="BookmarkRowNewIcons-icon BookmarkRowNewIcons-iconPublic BookmarkRowNewIcons-iconPublicLoader" />
            ) : (
              <Public
                className={
                  'BookmarkRowNewIcons-icon BookmarkRowNewIcons-iconPublic' +
                  (!!bookmark?.isPublic ? ' BookmarkRowNewIcons-iconPublic--active' : '')
                }
                onClick={onPublicClick}
              />
            )}
          </FadeInOut>
        )}
        {!!sessionUserBookmarkedLink && (
          <EditCircle className="BookmarkRowNewIcons-icon BookmarkRowNewIcons-iconEdit" onClick={onEdit} />
        )}
        {!!sessionUserBookmarkedLink && (
          <div className="BookmarkRowNewIcons-icon BookmarkRowNewIcons-iconLists">
            <List id={`BookmarkRowNewIcons-${bookmark?.id}`} onClick={onListsClick} />
            <BookmarkListsPopOverOrSheet bookmarkId={bookmark?.id} />
          </div>
        )}
      </Fade>
      <BookmarkerNew className="BookmarkRowNewIcons-iconBookmark" bookmarkId={bookmark?.id} listId={listId} />
    </div>
  </div>
);
