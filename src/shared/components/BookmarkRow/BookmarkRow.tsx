import React from 'react';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { A, Bookmark, Border, Edit, Fade, Private, Span, SpinnerCircle, Tag, Vote } from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  onVote: (vote: boolean | null) => void;
}

export const BookmarkRow: React.FC<BookmarkRow> = ({ id, title, url, tags = [], img, statistics, onVote }) => (
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
      <div className="BookmarkRow-leftTop">
        <Span bold className="BookmarkRow-title">
          {title}
        </Span>
        <div className="BookmarkRow-url">
          <A href={url}>
            <Span size="small">{url}</Span>
          </A>
        </div>
      </div>
      <div className="BookmarkRow-tags">
        {tags?.map((item) => (
          <A href={`/tags/${item.name}`} key={item.id} styled={false} frontend>
            <Tag className="BookmarkRow-tag" size="small">
              {item.name}
            </Tag>
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
            32
          </div>
          <div className="BookmarkRow-stat">
            <Span size="nano" className="BookmarkRow-statIcon">
              ⚭
            </Span>
            124
          </div>
        </div>
      </div>
    </div>
  </Border>
);

export default BookmarkRow;
