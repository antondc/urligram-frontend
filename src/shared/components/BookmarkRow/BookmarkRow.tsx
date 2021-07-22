import React from 'react';

import A from 'Components/A';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Space, Tag } from 'Vendor/components';
import { BookmarkRowIcons } from './BookmarkRowIcons';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  bookmark: Partial<BookmarkState>;
  listId?: number;
  tags: TagState[];
  bookmarkActionIconsMounted: boolean;
  recentlyCreated: boolean;
  sessionUserBookmarkedLink: boolean;
  createdAtFormatted: string;
  pathForTagLink: string;
  uiScreenTypeIsMobile: boolean;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
  onListsClick: () => void;
  onMobileBookmarkActionsIconClick: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  bookmark,
  listId,
  tags,
  bookmarkActionIconsMounted,
  onVote,
  sessionUserBookmarkedLink,
  createdAtFormatted,
  pathForTagLink,
  recentlyCreated,
  uiScreenTypeIsMobile,
  onEdit,
  onListsClick,
  onMobileBookmarkActionsIconClick,
  onMobileBookmarkActionsBackgroundClick,
}) => (
  <div
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={bookmark?.id}
  >
    <div className="BookmarkRow-title">
      <img className="BookmarkRow-favicon" src={bookmark?.favicon} />
      <A className="BookmarkRow-link" href={bookmark?.url} targetBlank styled={false}>
        {bookmark?.title}
      </A>
    </div>
    <div className="BookmarkRow-details">
      {!!bookmark?.statistics?.timesBookmarked && (
        <>
          Shared by
          <Space />
          {bookmark?.statistics?.timesBookmarked}
          <Space />
          user
          <span>{bookmark?.statistics?.timesBookmarked !== 1 ? 's' : ''}</span>
        </>
      )}
      {!!bookmark?.statistics?.timesBookmarked && !!bookmark?.statistics?.absoluteVote && (
        <>
          <Space />·<Space />
        </>
      )}
      {!!bookmark?.statistics?.absoluteVote && (
        <>
          Total votes
          <Space />
          {bookmark?.statistics?.absoluteVote}
        </>
      )}
      <Space />·<Space />
      Created at {createdAtFormatted}
    </div>
    <div className="BookmarkRow-tags">
      {tags?.map((item) => (
        <A
          className="BookmarkRow-tag"
          href={`${pathForTagLink}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="BookmarkRow-icons">
      <BookmarkRowIcons
        bookmark={bookmark}
        listId={listId}
        bookmarkActionIconsMounted={bookmarkActionIconsMounted}
        onVote={onVote}
        sessionUserBookmarkedLink={sessionUserBookmarkedLink}
        uiScreenTypeIsMobile={uiScreenTypeIsMobile}
        onEdit={onEdit}
        onListsClick={onListsClick}
        onMobileBookmarkActionsIconClick={onMobileBookmarkActionsIconClick}
        onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
      />
    </div>
  </div>
);

export default BookmarkRow;
