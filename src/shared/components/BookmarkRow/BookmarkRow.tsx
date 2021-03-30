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
  isPrivateRequestFailed: boolean;
  isPrivateRequestPending: boolean;
  isBookmarkDeletePending: boolean;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
  onPrivateSwitch: () => void;
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
  isPrivateRequestFailed,
  isPrivateRequestPending,
  onVote,
  onEdit,
  onPrivateSwitch,
  isBookmarkDeletePending,
  onBookmarkGrab,
  onBookmarkDelete,
  favicon,
  createdAt,
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
      <div className="BookmarkRow-icons">
        <img className="BookmarkRow-favicon" src={favicon} />
      </div>
      <Span bold className="BookmarkRow-title">
        <A href={url} targetBlank styled={false}>
          {title}
        </A>
      </Span>
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
      <Flex horizontal="right" growVertical={false} vertical="center">
        {isOwnBookmark && (
          <>
            <Private
              size="micro"
              className={
                'BookmarkRow-private' +
                (isPrivateRequestPending ? ' BookmarkRow--pending' : '') +
                (isPrivateRequestFailed ? ' BookmarkRow--failed' : '') +
                (isPrivate ? ' BookmarkRow-private--isPrivate' : '')
              }
              onClick={onPrivateSwitch}
            />
            <Edit size="micro" className="BookmarkRow-edit" onClick={onEdit} />
          </>
        )}

        <Vote vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      </Flex>
      <div className="BookmarkRow-stats">
        <div className="BookmarkRow-stat">
          <Span size="small" className="BookmarkRow-statIcon">
            ▲
          </Span>
          {statistics?.absoluteVote || 0}
        </div>
        <div className="BookmarkRow-stat">
          <Span size="small" className="BookmarkRow-statIcon">
            ⚭
          </Span>
          {statistics?.timesBookmarked || 0}
        </div>
      </div>
      <Span size="micro" className="BookmarkRow-stat">
        {createdAt}
      </Span>
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
