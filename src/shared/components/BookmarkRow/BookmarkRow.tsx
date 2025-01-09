import React from 'react';

import DotsVertical from 'Assets/svg/dotsVertical.svg';
import A from 'Components/A';
import Bookmarker from 'Components/Bookmarker';
import { CustomTag } from 'Components/CustomTag';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Img, Space } from '@antoniodcorrea/components';
import { BookmarkRowIcons } from './BookmarkRowIcons';

import './BookmarkRow.less';

export interface BookmarkRowProps {
  bookmark: Partial<BookmarkState>;
  listId?: number;
  tags: TagState[];
  domain: string;
  bookmarkActionIconsMounted: boolean;
  recentlyCreated: boolean;
  viewPending: boolean;
  sessionUserBookmarkedLink: boolean;
  createdAtFormatted: string;
  tagsHref: string;
  uiScreenTypeIsMobile: boolean;
  onEdit: () => void;
  onListBookmarkRemove: () => void;
  onMobileBookmarkActionsIconClick: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
  bookmarkViewed: () => void;
  bookmarkIdInAnyOfMyLists: boolean;
  publicLoading: boolean;
  onPublicClick: () => void;
  isListPage: boolean;
  removingFromList: boolean;
}

export const BookmarkRow: React.FC<BookmarkRowProps> = ({
  bookmark,
  listId,
  domain,
  tags,
  bookmarkActionIconsMounted,
  sessionUserBookmarkedLink,
  createdAtFormatted,
  tagsHref,
  recentlyCreated,
  viewPending,
  uiScreenTypeIsMobile,
  onEdit,
  onListBookmarkRemove,
  onMobileBookmarkActionsIconClick,
  onMobileBookmarkActionsBackgroundClick,
  bookmarkViewed,
  bookmarkIdInAnyOfMyLists,
  publicLoading,
  onPublicClick,
  isListPage,
  removingFromList,
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
      <Img className="BookmarkRow-titleIcon" src={bookmark?.favicon} alt={bookmark?.title} title={bookmark?.title} />
      <A
        className="BookmarkRow-titleLink"
        href={bookmark?.url}
        onClick={bookmarkViewed}
        targetBlank
        underlined
        styled={false}
      >
        {bookmark?.title}
      </A>
    </div>
    <div className="BookmarkRow-description">
      <A
        className="BookmarkRow-descriptionUrl"
        href={bookmark?.url}
        onClick={bookmarkViewed}
        targetBlank
        underlined
        styled={false}
      >
        {domain}
      </A>
      <Space />·<Space />
      Created at {createdAtFormatted}
      <Space />·<Space />
      Bookmarked
      <Space />
      {bookmark?.statistics?.timesBookmarked}
      <Space />
      time
      <span>{bookmark?.statistics?.timesBookmarked > 1 ? 's' : ''}</span>
    </div>
    <div className="BookmarkRow-tags">
      {tags?.map((item) => (
        <A
          className="BookmarkRow-tag"
          href={`${tagsHref}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
          scrollBeforeNavigate
        >
          <CustomTag>{item.name}</CustomTag>
        </A>
      ))}
    </div>
    <Bookmarker className="BookmarkRow-bookmarker" bookmarkId={bookmark?.id} listId={listId} />
    <DotsVertical
      className={'BookmarkRow-actions' + (sessionUserBookmarkedLink ? ' BookmarkRow-actions--isDragging' : '')}
      onClick={onMobileBookmarkActionsIconClick}
    />
    <div className="BookmarkRow-icons" onClick={bookmarkViewed}>
      <BookmarkRowIcons
        bookmark={bookmark}
        listId={listId}
        bookmarkActionIconsMounted={bookmarkActionIconsMounted}
        sessionUserBookmarkedLink={sessionUserBookmarkedLink}
        bookmarkIdInAnyOfMyLists={bookmarkIdInAnyOfMyLists}
        uiScreenTypeIsMobile={uiScreenTypeIsMobile}
        onEdit={onEdit}
        onListBookmarkRemove={onListBookmarkRemove}
        onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
        publicLoading={publicLoading}
        onPublicClick={onPublicClick}
        isListPage={isListPage}
        removingFromList={removingFromList}
      />
    </div>
    <div className="BookmarkRow-notification" onClick={bookmarkViewed}>
      <span />
    </div>
  </div>
);
