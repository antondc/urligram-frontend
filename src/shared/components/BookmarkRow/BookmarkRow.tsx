import React from 'react';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import BookmarkLists from 'Components/BookmarkLists';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Border, Flex, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  userId: string;
  recentlyCreated: boolean;
  isOwnBookmark: boolean;
  onVote: (vote: boolean | null) => void;
  onBookmarkRowMouseLeave: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  userId,
  id,
  title,
  linkId,
  url,
  tags = [],
  statistics,
  isPrivate,
  onVote,
  favicon,
  recentlyCreated,
  isOwnBookmark,
  onBookmarkRowMouseLeave,
}) => (
  <Border
    grow
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={id}
    onMouseLeave={onBookmarkRowMouseLeave}
  >
    <div className="BookmarkRow-left">
      <Flex vertical="center" growVertical={false} horizontal="left" noWrap>
        <img className="LinkRow-favicon" src={favicon} />
        <Span bold className="LinkRow-title">
          <A href={url} targetBlank styled={false}>
            {title}
          </A>
        </Span>
      </Flex>
      <Span className="BookmarkRow-url" size="small">
        <A href={url} targetBlank>
          {url}
        </A>
      </Span>
    </div>
    <div className="BookmarkRow-center">
      {tags?.map((item) => (
        <A
          className="BookmarkRow-tag"
          href={`users/${userId}/bookmarks?filter[tags][]=${item.name}`}
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
    <div className="BookmarkRow-right">
      <Flex horizontal="right" growVertical={false} vertical="bottom" noWrap>
        {isOwnBookmark && <BookmarkLists bookmarkId={id} />}
        {isPrivate && <Private size="micro" className="BookmarkRow-icon BookmarkRow-private" />}
        <Vote className="BookmarkRow-icon " vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      </Flex>
      <div className="BookmarkRow-stats">
        <Span size="micro" className="LinkRow-stat">
          <Span size="small" className="LinkRow-statIcon">
            ▲
          </Span>
          {statistics?.absoluteVote || 0}
        </Span>
        <Span size="micro" className="LinkRow-stat">
          <Span size="small" className="LinkRow-statIcon">
            ⚭
          </Span>
          {statistics?.timesBookmarked || 0}
        </Span>
      </div>
    </div>
    <BookmarkActions className="BookmarkRow-actionButton" linkId={linkId} bookmarkId={id} />
  </Border>
);

export default BookmarkRow;
