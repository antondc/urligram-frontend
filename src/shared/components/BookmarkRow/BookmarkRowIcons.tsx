import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Public from 'Assets/svg/earth.svg';
import EditCircle from 'Assets/svg/editCircle.svg';
import Info from 'Assets/svg/info.svg';
import List from 'Assets/svg/list.svg';
import A from 'Components/A';
import Bookmarker from 'Components/Bookmarker';
import BookmarkListsPopOverOrSheet from 'Components/BookmarkListsPopOverOrSheet';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Fade, FadeInOut, Spinner } from '@antoniodcorrea/components';

import './BookmarkRowIcons.less';

interface BookmarkRowIcons extends BookmarkState {
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

export const BookmarkRowIcons: React.FC<Partial<BookmarkRowIcons>> = ({
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
  <div className="BookmarkRowIcons" data-test-id="BookmarkRowIcons">
    <div
      className={
        'BookmarkRowIcons-actionsIconsWrapper' +
        (bookmarkActionIconsMounted ? ' BookmarkRowIcons-actionsIconsWrapper--mounted' : '')
      }
      onClick={onMobileBookmarkActionsBackgroundClick}
    >
      <Fade
        className="BookmarkRowIcons-actionsIconsBackground"
        onClick={onMobileBookmarkActionsBackgroundClick}
        speed="normal"
        mounted={uiScreenTypeIsMobile && bookmarkActionIconsMounted}
      >
        <Cross className="BookmarkRowIcons-actionsIconsBackgroundCloseIcon" />
      </Fade>
      <Fade
        className="BookmarkRowIcons-actionsIcons"
        mounted={bookmarkActionIconsMounted}
        speed="fastest"
        direction="right"
        appear
        disabled={!uiScreenTypeIsMobile}
        unmountOnExit={false}
      >
        {withInfoButton && (
          <A
            className="BookmarkRowIcons-iconWrapper"
            href={`link/${bookmark?.linkId}`}
            styled={false}
            scrollBeforeNavigate
          >
            <Info className="BookmarkRowIcons-icon BookmarkRowIcons-iconInfo" />
          </A>
        )}
        {sessionUserBookmarkedLink && (
          <FadeInOut className="BookmarkRowIcons-iconWrapper" valueToUpdate={publicLoading} appear speed="fast">
            {publicLoading ? (
              <Spinner className="BookmarkRowIcons-icon BookmarkRowIcons-iconPublic BookmarkRowIcons-iconPublicLoader" />
            ) : (
              <Public
                className={
                  'BookmarkRowIcons-icon BookmarkRowIcons-iconPublic' +
                  (!!bookmark?.isPublic ? ' BookmarkRowIcons-iconPublic--active' : '')
                }
                onClick={onPublicClick}
              />
            )}
          </FadeInOut>
        )}
        {!!sessionUserBookmarkedLink && (
          <EditCircle className="BookmarkRowIcons-icon BookmarkRowIcons-iconEdit" onClick={onEdit} />
        )}
        {!!sessionUserBookmarkedLink && (
          <div className="BookmarkRowIcons-icon BookmarkRowIcons-iconLists">
            <List id={`BookmarkRowIcons-${bookmark?.id}`} onClick={onListsClick} />
            <BookmarkListsPopOverOrSheet bookmarkId={bookmark?.id} />
          </div>
        )}
      </Fade>
      <Bookmarker className="BookmarkRowIcons-iconBookmark" bookmarkId={bookmark?.id} listId={listId} />
    </div>
  </div>
);
