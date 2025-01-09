import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Public from 'Assets/svg/earth.svg';
import EditCircle from 'Assets/svg/editCircle.svg';
import Folder from 'Assets/svg/folder.svg';
import Bookmarker from 'Components/Bookmarker';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Fade, FadeInOut, PlusCircleWithBackground, Spinner } from '@antoniodcorrea/components';

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
  onListBookmarkRemove: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
  publicLoading: boolean;
  onPublicClick: () => void;
  isListPage: boolean;
  removingFromList: boolean;
}

export const BookmarkRowIcons: React.FC<Partial<BookmarkRowIcons>> = ({
  bookmark,
  listId,
  bookmarkActionIconsMounted,
  sessionUserBookmarkedLink,
  uiScreenTypeIsMobile,
  onEdit,
  onListBookmarkRemove,
  onMobileBookmarkActionsBackgroundClick,
  publicLoading,
  onPublicClick,
  isListPage,
  removingFromList,
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
        {!!sessionUserBookmarkedLink && isListPage && (
          <div className="BookmarkRowIcons-icon BookmarkRowIcons-iconFolder">
            {!removingFromList && (
              <>
                <Folder className="BookmarkRowIcons-iconFolderNormal" />
                <PlusCircleWithBackground
                  className="BookmarkRowIcons-iconFolderRemove"
                  onClick={onListBookmarkRemove}
                />
              </>
            )}
            {removingFromList && (
              <Spinner className="BookmarkRowIcons-iconFolderNormal BookmarkRowIcons-iconFolderLoader" />
            )}
          </div>
        )}
      </Fade>
      <Bookmarker className="BookmarkRowIcons-iconBookmark" bookmarkId={bookmark?.id} listId={listId} />
    </div>
  </div>
);
