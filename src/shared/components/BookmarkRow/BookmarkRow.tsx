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
  onVote: (vote: boolean | null) => void;
  onBookmark: () => void;
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
  onBookmark,
  favicon,
  createdAt,
}) => (
  <Border grow className="BookmarkRow" data-test-id="BookmarkRow" key={id}>
    <div className="BookmarkRow-left">
      <div className="BookmarkRow-icons">
        <img className="BookmarkRow-favicon" src={favicon} />
        <Bookmark size="micro" className="BookmarkRow-icon" />
        <Private
          size="micro"
          className="BookmarkRow-icon BookmarkRow-iconHover"
          onClick={() => {
            alert('Private');
          }}
        />
        <Edit
          size="micro"
          className="BookmarkRow-icon BookmarkRow-iconHover"
          onClick={() => {
            alert('Edit');
          }}
        />
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
        <FadeInOut valueToUpdate={bookmarkingLoading} speed="fastest" appear>
          <Flex horizontal="right" growVertical={false} vertical="center">
            {bookmarkingLoading ? (
              <Ellipsis size="nano" />
            ) : (
              <Bookmark
                className={'LinkRow-bookmarkSign ' + (!userBookmarked ? 'LinkRow-bookmarkSign--disabled' : '')}
                size="small"
                onClick={onBookmark}
              />
            )}
          </Flex>
        </FadeInOut>
        <Vote className="LinkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
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
