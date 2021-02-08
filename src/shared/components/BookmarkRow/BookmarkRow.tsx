import React from 'react';

import A from 'Components/A';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Bookmark, Border, Edit, Hr, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  onVote: (vote: boolean | null) => void;
}

export const BookmarkRow: React.FC<BookmarkRow> = ({ id, title, url, tags = [], img, statistics, onVote }) => (
  <Border grow className="BookmarkRow" data-test-id="BookmarkRow" key={id}>
    <div className="BookmarkRow-left">
      <div className="BookmarkRow-leftTop">
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
      </div>
      <Hr spacer size="micro" />
      <Span bold className="BookmarkRow-title">
        {title}
      </Span>
      <Hr spacer size="zero" />
      <A href={url} targetBlank>
        <Span size="small">{url}</Span>
      </A>
      <div className="BookmarkRow-tags">
        {tags?.map((item) => (
          <A
            className="BookmarkRow-tag"
            href={`/links?filter[tags]=${item.name}`}
            key={item.id}
            styled={false}
            frontend
          >
            <Tag size="small">{item.name}</Tag>
          </A>
        ))}
      </div>
    </div>
    <div className="BookmarkRow-right">
      <img className="BookmarkRow-image" src={img} />
      <div className="BookmarkRow-rightEnd">
        <Vote className="BookmarkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
        <div className="BookmarkRow-stats">
          <div className="BookmarkRow-stat">
            <Span size="nano" className="BookmarkRow-statIcon">
              ▲
            </Span>
            {statistics?.absoluteVote}
          </div>
          <div className="BookmarkRow-stat">
            <Span size="nano" className="BookmarkRow-statIcon">
              ⚭
            </Span>
            {statistics?.timesBookmarked}
          </div>
        </div>
      </div>
    </div>
  </Border>
);

export default BookmarkRow;
