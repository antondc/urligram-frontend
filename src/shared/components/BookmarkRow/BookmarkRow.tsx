import React from 'react';

import DotsVertical from 'Assets/svg/dotsVertical.svg';
import A from 'Components/A';
import Bookmarker from 'Components/Bookmarker';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Space, Tag } from '@antoniodcorrea/components';
import { BookmarkRowIcons } from './BookmarkRowIcons';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  bookmark: Partial<BookmarkState>;
  listId?: number;
  tags: TagState[];
  bookmarkActionIconsMounted: boolean;
  recentlyCreated: boolean;
  viewPending: boolean;
  sessionUserBookmarkedLink: boolean;
  createdAtFormatted: string;
  pathForTagLink: string;
  uiScreenTypeIsMobile: boolean;
  onEdit: () => void;
  onListsClick: () => void;
  onMobileBookmarkActionsIconClick: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
  bookmarkViewed: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  bookmark,
  listId,
  tags,
  bookmarkActionIconsMounted,
  sessionUserBookmarkedLink,
  createdAtFormatted,
  pathForTagLink,
  recentlyCreated,
  viewPending,
  uiScreenTypeIsMobile,
  onEdit,
  onListsClick,
  onMobileBookmarkActionsIconClick,
  onMobileBookmarkActionsBackgroundClick,
  bookmarkViewed,
}) => (
  <div
    className={
      'BookmarkRow' +
      (recentlyCreated ? ' BookmarkRow--recentlyCreated' : '') +
      (viewPending ? ' BookmarkRow--viewPending' : '')
    }
    data-test-id="BookmarkRow"
    key={bookmark?.id}
  >
    <div className="BookmarkRow-title">
      <A href={bookmark?.url} onClick={bookmarkViewed} targetBlank underlined styled={false}>
        <img className="BookmarkRow-titleIcon" src={bookmark?.favicon} />
        {bookmark?.title}
      </A>
    </div>
    <div className="BookmarkRow-description">
      {!!bookmark?.statistics?.timesBookmarked && (
        <>
          Shared by
          <Space />
          {bookmark?.statistics?.timesBookmarked}
          <Space />
          user
          <span>{bookmark?.statistics?.timesBookmarked > 1 ? 's' : ''}</span>
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
      <Space />·<Space />
      Bookmarked {bookmark?.statistics?.timesBookmarked} time
      <span>{bookmark?.statistics?.timesBookmarked > 1 ? 's' : ''}</span>
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
          <Tag>{item.name}</Tag>
        </A>
      ))}
    </div>
    <Bookmarker className="BookmarkRow-bookmarker" bookmarkId={bookmark?.id} listId={listId} />
    <DotsVertical
      className={'BookmarkRow-actions' + (sessionUserBookmarkedLink ? ' BookmarkRow-actions--active' : '')}
      onClick={onMobileBookmarkActionsIconClick}
    />
    <div className="BookmarkRow-icons" onClick={bookmarkViewed}>
      <BookmarkRowIcons
        bookmark={bookmark}
        listId={listId}
        bookmarkActionIconsMounted={bookmarkActionIconsMounted}
        sessionUserBookmarkedLink={sessionUserBookmarkedLink}
        uiScreenTypeIsMobile={uiScreenTypeIsMobile}
        onEdit={onEdit}
        onListsClick={onListsClick}
        onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
      />
    </div>
    <div className="BookmarkRow-notification" />
  </div>
);
