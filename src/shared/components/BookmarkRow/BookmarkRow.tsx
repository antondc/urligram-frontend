import React from 'react';

import A from 'Components/A';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import {
  Bookmark,
  Border,
  Edit,
  Ellipsis,
  FadeInOut,
  Flex,
  Private,
  Span,
  Tag,
  Vote,
} from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  userId: string;
  userBookmarked: boolean;
  bookmarkingLoading: boolean;
  recentlyCreated: boolean;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
  onBookmark: () => void;
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
  userBookmarked,
  onVote,
  onEdit,
  onBookmark,
  favicon,
  createdAt,
  recentlyCreated,
  onMouseLeave
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
        <Private
          size="micro"
          className="BookmarkRow-action"
          onClick={() => {
            alert('Private');
          }}
        />
        {userBookmarked && <Edit size="micro" className="BookmarkRow-action" onClick={onEdit} />}
        <FadeInOut valueToUpdate={bookmarkingLoading} speed="fastest" appear>
          <Flex horizontal="right" growVertical={false} vertical="center">
            {bookmarkingLoading ? (
              <Ellipsis className="BookmarkRow-ellipsis BookmarkRow-action" size="nano" />
            ) : (
              <Bookmark
                className={
                  'BookmarkRow-action BookmarkRow-bookmarkSign ' +
                  (!userBookmarked ? 'BookmarkRow-bookmarkSign--disabled' : '')
                }
                size="small"
                onClick={onBookmark}
              />
            )}
          </Flex>
        </FadeInOut>
        <Vote className="BookmarkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
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
  </Border>
);

export default BookmarkRow;
