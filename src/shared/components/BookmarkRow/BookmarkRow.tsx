import React from 'react';

import A from 'Components/A';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Bookmark, Border, Edit, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  onVote: (vote: boolean | null) => void;
}

export const BookmarkRow: React.FC<BookmarkRow> = ({ id, title, url, tags = [], statistics, onVote }) => (
  <Border grow className="BookmarkRow" data-test-id="BookmarkRow" key={id}>
    <div className="BookmarkRow-left">
      <div className="BookmarkRow-icons">
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
        {title}
      </Span>
      <A href={url} targetBlank>
        <Span className="BookmarkRow-url" size="small">
          {url}
        </Span>
      </A>
    </div>
    <div className="BookmarkRow-center">
      {tags?.map((item) => (
        <A
          className="BookmarkRow-tag"
          href={`/links?filter[tags][]=${item.name}`}
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
      <Vote className="BookmarkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      <div className="BookmarkRow-stats">
        <div className="BookmarkRow-stat">
          <Span size="small" className="BookmarkRow-statIcon">
            ▲
          </Span>
          {statistics?.absoluteVote}
        </div>
        <div className="BookmarkRow-stat">
          <Span size="small" className="BookmarkRow-statIcon">
            ⚭
          </Span>
          {statistics?.timesBookmarked}
        </div>
      </div>
    </div>
  </Border>
);

export default BookmarkRow;
