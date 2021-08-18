import React from 'react';

import Bookmark from 'Assets/svg/bookmark.svg';
import Cross from 'Assets/svg/cross.svg';
import DotsVertical from 'Assets/svg/dotsVertical.svg';
import EditCircle from 'Assets/svg/editCircle.svg';
import List from 'Assets/svg/list.svg';
import Private from 'Assets/svg/private.svg';
import BookmarkActions from 'Components/BookmarkActions';
import BookmarkListsPopOverOrSheet from 'Components/BookmarkListsPopOverOrSheet';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Fade, Tooltip } from 'Vendor/components';
import { RenderInPortal } from '../Portal';

import './BookmarkRowIcons.less';

interface BookmarkRowIcons extends BookmarkState {
  bookmark: Partial<BookmarkState>;
  listId?: number;
  tags: TagState[];
  bookmarkActionIconsMounted: boolean;
  sessionUserBookmarkedLink: boolean;
  createdAtFormatted: string;
  pathForTagLink: string;
  uiScreenTypeIsMobile: boolean;
  onEdit: () => void;
  onListsClick: () => void;
  onMobileBookmarkActionsIconClick: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
}

export const BookmarkRowIcons: React.FC<Partial<BookmarkRowIcons>> = ({
  bookmark,
  listId,
  bookmarkActionIconsMounted,
  sessionUserBookmarkedLink,
  uiScreenTypeIsMobile,
  onEdit,
  onListsClick,
  onMobileBookmarkActionsIconClick,
  onMobileBookmarkActionsBackgroundClick,
}) => (
  <div className="BookmarkRowIcons" data-test-id="BookmarkRowIcons">
    <DotsVertical className="BookmarkRowIcons-actionsIcon" onClick={onMobileBookmarkActionsIconClick} />
    <div
      className={
        'BookmarkRowIcons-actionsIconsWrapper' +
        (bookmarkActionIconsMounted ? ' BookmarkRowIcons-actionsIconsWrapper--mounted' : '')
      }
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
      >
        {!!sessionUserBookmarkedLink && (
          <EditCircle className="BookmarkRowIcons-icon BookmarkRowIcons-iconEdit" onClick={onEdit} />
        )}
        {!!sessionUserBookmarkedLink && (
          <div className="BookmarkRowIcons-icon BookmarkRowIcons-iconLists">
            <List id={`BookmarkRowIcons-${bookmark?.id}`} onClick={onListsClick} />
            <BookmarkListsPopOverOrSheet bookmarkId={bookmark?.id} />
          </div>
        )}
        {!uiScreenTypeIsMobile && !!bookmark?.isPrivate && (
          <Private className="BookmarkRowIcons-icon BookmarkRowIcons-iconPrivate" />
        )}
        <div className="BookmarkRowIcons-timesBookmarked" id={`BookmarkRowIcons-timesBookmarked--${bookmark?.id}`}>
          {bookmark.statistics.timesBookmarked} <Bookmark className="BookmarkRowIcons-timesBookmarkedIcon" />
        </div>
        <RenderInPortal>
          <Tooltip
            parentElementId={`BookmarkRowIcons-timesBookmarked--${bookmark?.id}`}
            content="Times bookmarked"
            delay={1.5}
          />
        </RenderInPortal>
        <BookmarkActions
          className="BookmarkRowIcons-iconBookmark"
          linkId={bookmark?.linkId}
          bookmarkId={bookmark?.id}
          listId={listId}
        />
      </Fade>
    </div>
  </div>
);
