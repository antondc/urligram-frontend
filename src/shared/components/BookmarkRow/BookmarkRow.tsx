import React from 'react';

import A from 'Components/A';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import {
  BookmarkFilled,
  BookmarkWithBackground,
  Border,
  Edit,
  Flex,
  PlusCircleWithBackground,
  Private,
  Span,
  Tag,
  Vote,
} from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  userId: string;
  isOwnBookmark: boolean;
  userBookmarkedLink: boolean;
  bookmarkingLoading: boolean;
  recentlyCreated: boolean;
  isBookmarkDeletePending: boolean;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
  onMouseLeave: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  userId,
  id,
  title,
  url,
  tags = [],
  statistics,
  bookmarkingLoading,
  isOwnBookmark,
  userBookmarkedLink,
  isPrivate,
  onVote,
  onEdit,
  isBookmarkDeletePending,
  onBookmarkGrab,
  onBookmarkDelete,
  favicon,
  recentlyCreated,
  onMouseLeave,
}) => (
  <Border
    grow
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={id}
    onMouseLeave={onMouseLeave}
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
        {isOwnBookmark && isPrivate && <Private size="micro" className="BookmarkRow-icon BookmarkRow-private" />}
        {isOwnBookmark && <Edit size="micro" className="BookmarkRow-icon BookmarkRow-edit" onClick={onEdit} />}
        <Vote className="BookmarkRow-icon " vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      </Flex>
      <div className="BookmarkRow-stats">
        <div className="BookmarkRow-stat">
          <Span size="small" className="BookmarkRow-icon BookmarkRow-statIcon">
            ▲
          </Span>
          {statistics?.absoluteVote || 0}
        </div>
        <div className="BookmarkRow-stat">
          <Span size="small" className="BookmarkRow-icon BookmarkRow-statIcon">
            ⚭
          </Span>
          {statistics?.timesBookmarked || 0}
        </div>
      </div>
    </div>
    {isOwnBookmark && (
      <span className={'BookmarkRow-myBookmark' + (isBookmarkDeletePending ? ' BookmarkRow--pending' : '')}>
        <BookmarkFilled className="BookmarkRow-myBookmarkBookmark" size="small" />
        <PlusCircleWithBackground className="BookmarkRow-myBookmarkCross" size="medium" onClick={onBookmarkDelete} />
      </span>
    )}
    {!isOwnBookmark && (
      <BookmarkWithBackground
        className={
          'BookmarkRow-bookmark' +
          (userBookmarkedLink ? ' BookmarkRow-bookmark--bookmarked' : '') +
          (bookmarkingLoading ? ' BookmarkRow-bookmark--pending' : '')
        }
        size="small"
        onClick={onBookmarkGrab}
      />
    )}
  </Border>
);

export default BookmarkRow;
