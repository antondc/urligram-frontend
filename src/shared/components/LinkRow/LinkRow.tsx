import React from 'react';

import A from 'Components/A';
import { LinkState } from 'Modules/Links/links.types';
import {
  BookmarkFilled,
  BookmarkWithBackground,
  Border,
  Flex,
  PlusCircleWithBackground,
  Span,
  Tag,
  Vote,
} from '@antoniodcorrea/components';

import './LinkRow.less';

interface LinkRow extends LinkState {
  onVote: (vote: boolean | null) => void;
  onBookmarkGrab: () => void;
  onBookmarkDelete: () => void;
  createdAtFormatted: string;
  isBookmarkDeletePending: boolean;
  bookmarkingLoading: boolean;
  userBookmarked: boolean;
}

export const LinkRow: React.FC<Partial<LinkRow>> = ({
  id,
  title,
  url,
  tags = [],
  statistics,
  users,
  onVote,
  onBookmarkGrab,
  onBookmarkDelete,
  isBookmarkDeletePending,
  favicon,
  createdAtFormatted,
  userBookmarked,
  bookmarkingLoading,
}) => (
  <Border grow className="LinkRow" data-test-id="LinkRow" key={id}>
    <div className="LinkRow-left">
      <div className="LinkRow-icons">
        <img className="LinkRow-favicon" src={favicon} />
      </div>
      <Span bold className="LinkRow-title">
        <A href={url} targetBlank styled={false}>
          {title}
        </A>
      </Span>
      <Span className="LinkRow-url" size="small">
        <A href={url} targetBlank>
          {url}
        </A>
      </Span>
    </div>
    <div className="LinkRow-center">
      {tags?.map((item) => (
        <A className="LinkRow-tag" href={`/links?filter[tags][]=${item.name}`} key={item.id} styled={false} frontend>
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="LinkRow-right">
      <Flex horizontal="right" growVertical={false} vertical="center">
        <Vote className="LinkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      </Flex>
      <div className="LinkRow-stats">
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
          {users.length || 0}
        </Span>
        <br />
      </div>
      <Span size="micro" className="LinkRow-stat">
        {createdAtFormatted || ''}
      </Span>
    </div>
    {userBookmarked && (
      <span className={'BookmarkRow-myBookmark' + (isBookmarkDeletePending ? ' BookmarkRow--pending' : '')}>
        <BookmarkFilled className="BookmarkRow-myBookmarkBookmark" size="small" />
        <PlusCircleWithBackground className="BookmarkRow-myBookmarkCross" size="medium" onClick={onBookmarkDelete} />
      </span>
    )}
    {!userBookmarked && (
      <BookmarkWithBackground
        className={'BookmarkRow-bookmark' + (bookmarkingLoading ? ' BookmarkRow-bookmark--pending' : '')}
        size="small"
        onClick={onBookmarkGrab}
      />
    )}
  </Border>
);

export default LinkRow;
