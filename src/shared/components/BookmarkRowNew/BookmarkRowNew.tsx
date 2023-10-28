import React from 'react';

import DotsVertical from 'Assets/svg/dotsVertical.svg';
import A from 'Components/A';
import BookmarkerNew from 'Components/BookmarkerNew';
import { TagNew } from 'Components/TagNew';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Img, Space } from '@antoniodcorrea/components';
import { BookmarkRowNewIcons } from './BookmarkRowNewIcons';

import './BookmarkRowNew.less';

export interface BookmarkRowNewProps {
  bookmark: Partial<BookmarkState>;
  listId?: number;
  withInfoButton: boolean;
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
  onListsClick: () => void;
  onMobileBookmarkActionsIconClick: () => void;
  onMobileBookmarkActionsBackgroundClick: () => void;
  bookmarkViewed: () => void;
  bookmarkIdInAnyOfMyLists: boolean;
  publicLoading: boolean;
  onPublicClick: () => void;
}

export const BookmarkRowNew: React.FC<BookmarkRowNewProps> = ({
  bookmark,
  listId,
  withInfoButton,
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
  onListsClick,
  onMobileBookmarkActionsIconClick,
  onMobileBookmarkActionsBackgroundClick,
  bookmarkViewed,
  bookmarkIdInAnyOfMyLists,
  publicLoading,
  onPublicClick,
}) => (
  <div
    className={
      'BookmarkRowNew' +
      (recentlyCreated ? ' BookmarkRowNew--recentlyCreated' : '') +
      (viewPending ? ' BookmarkRowNew--viewPending' : '')
    }
    data-test-id="BookmarkRowNew"
    key={bookmark?.id}
  >
    <div className="BookmarkRowNew-title">
      <Img className="BookmarkRowNew-titleIcon" src={bookmark?.favicon} alt={bookmark?.title} title={bookmark?.title} />
      <A href={bookmark?.url} onClick={bookmarkViewed} targetBlank underlined styled={false}>
        {bookmark?.title}
      </A>
    </div>
    <div className="BookmarkRowNew-description">
      <A
        className="BookmarkRowNew-descriptionUrl"
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
    <div className="BookmarkRowNew-tags">
      {tags?.map((item) => (
        <A
          className="BookmarkRowNew-tag"
          href={`${tagsHref}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
          scrollBeforeNavigate
        >
          <TagNew>{item.name}</TagNew>
        </A>
      ))}
    </div>
    <BookmarkerNew className="BookmarkRowNew-bookmarker" bookmarkId={bookmark?.id} listId={listId} />
    <DotsVertical
      className={'BookmarkRowNew-actions' + (sessionUserBookmarkedLink ? ' BookmarkRowNew-actions--active' : '')}
      onClick={onMobileBookmarkActionsIconClick}
    />
    <div className="BookmarkRowNew-icons" onClick={bookmarkViewed}>
      <BookmarkRowNewIcons
        bookmark={bookmark}
        listId={listId}
        withInfoButton={withInfoButton}
        bookmarkActionIconsMounted={bookmarkActionIconsMounted}
        sessionUserBookmarkedLink={sessionUserBookmarkedLink}
        bookmarkIdInAnyOfMyLists={bookmarkIdInAnyOfMyLists}
        uiScreenTypeIsMobile={uiScreenTypeIsMobile}
        onEdit={onEdit}
        onListsClick={onListsClick}
        onMobileBookmarkActionsBackgroundClick={onMobileBookmarkActionsBackgroundClick}
        publicLoading={publicLoading}
        onPublicClick={onPublicClick}
      />
    </div>
    <div className="BookmarkRowNew-notification" onClick={bookmarkViewed}>
      <span />
    </div>
  </div>
);
