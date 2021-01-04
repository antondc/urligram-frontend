import React from 'react';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { A, Border, Edit, Link, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './BookmarkRow.less';

export const BookmarkRow: React.FC<BookmarkState> = ({ id, title, url, tags = [], img, statistics, linkId }) => {
  const onVote = (vote) => {
    alert(JSON.stringify({ vote, linkId }, null, 4));
  };

  return (
    <Border grow className="BookmarkRow" data-test-id="BookmarkRow" key={id}>
      <div className="BookmarkRow-left">
        <div className="BookmarkRow-icons">
          <Link size="micro" className="BookmarkRow-icon" />
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
          <Vote className="BookmarkRow-vote" vote={statistics?.vote} changeVote={onVote} />
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
};

export default BookmarkRow;
