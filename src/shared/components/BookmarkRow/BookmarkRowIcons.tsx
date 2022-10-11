import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import EditCircle from 'Assets/svg/editCircle.svg';
import Info from 'Assets/svg/info.svg';
import List from 'Assets/svg/list.svg';
import Private from 'Assets/svg/private.svg';
import A from 'Components/A';
import Bookmarker from 'Components/Bookmarker';
import BookmarkListsPopOverOrSheet from 'Components/BookmarkListsPopOverOrSheet';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Fade } from '@antoniodcorrea/components';

import './BookmarkRowIcons.less';

interface BookmarkRowIcons extends BookmarkState {
  bookmark: Partial<BookmarkState>;
  listId?: number;
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
}

export const BookmarkRowIcons: React.FC<Partial<BookmarkRowIcons>> = ({
  bookmark,
  listId,
  bookmarkActionIconsMounted,
  sessionUserBookmarkedLink,
  bookmarkIdInAnyOfMyLists,
  uiScreenTypeIsMobile,
  onEdit,
  onListsClick,
  onMobileBookmarkActionsBackgroundClick,
}) => (
  <div className="BookmarkRowIcons" data-test-id="BookmarkRowIcons">
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
        <A href={`link/${bookmark?.linkId}`} styled={false} scrollBeforeNavigate>
          <Info className="BookmarkRowIcons-icon BookmarkRowIcons-iconInfo" />
        </A>
        {!uiScreenTypeIsMobile && !!bookmark?.isPrivate && (
          <Private className="BookmarkRowIcons-icon BookmarkRowIcons-iconPrivate" />
        )}
        {!!sessionUserBookmarkedLink && (
          <EditCircle className="BookmarkRowIcons-icon BookmarkRowIcons-iconEdit" onClick={onEdit} />
        )}
        {(!!sessionUserBookmarkedLink || bookmarkIdInAnyOfMyLists) && (
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
