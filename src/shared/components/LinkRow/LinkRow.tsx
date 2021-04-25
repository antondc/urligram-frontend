import React from 'react';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import { Border, Flex, Span, Tag, Vote } from 'Vendor/components';
import { LinkState } from 'Modules/Links/links.types';

import './LinkRow.less';

interface LinkRow extends LinkState {
  onVote: (vote: boolean | null) => void;
  userBookmarked: boolean;
}

export const LinkRow: React.FC<Partial<LinkRow>> = ({
  id,
  title,
  url,
  tags = [],
  statistics,
  bookmarksRelated,
  onVote,
  favicon,
}) => (
  <Border grow className="LinkRow" data-test-id="LinkRow" key={id}>
    <div className="LinkRow-left">
      <Flex vertical="center" growVertical={false} horizontal="left" noWrap>
        <img className="LinkRow-favicon" src={favicon} />
        <Span bold className="LinkRow-title">
          <A href={url} targetBlank styled={false}>
            {title}
          </A>
        </Span>
      </Flex>
      <Span className="LinkRow-url" size="small">
        <A href={url} targetBlank>
          {url}
        </A>
      </Span>
    </div>
    <div className="LinkRow-center">
      {tags?.map((item) => (
        <A
          className="LinkRow-tag"
          href={`/bookmarks?filter[tags][]=${item.name}`}
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
    <div className="LinkRow-right">
      <Flex horizontal="right" growVertical={false} vertical="bottom">
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
          {bookmarksRelated?.length || 0}
        </Span>
      </div>
    </div>
    <BookmarkActions className="LinkRow-actionButton" linkId={id} />
  </Border>
);

export default LinkRow;
