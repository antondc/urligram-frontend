import React from 'react';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { A, Border, Circle, Edit, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './LinkRow.less';

export const LinkRow: React.FC<BookmarkState> = ({ id, title, url, tags = [], img, statistics, linkId }) => {
  const onVote = (vote) => {
    alert(JSON.stringify({ vote, linkId }, null, 4));
  };

  return (
    <Border grow className="LinkRow" data-test-id="LinkRow" key={id}>
      <div className="LinkRow-left">
        <div className="LinkRow-icons">
          <Circle size="micro" className="LinkRow-icon" />
          <Private
            size="micro"
            className="LinkRow-icon LinkRow-iconHover"
            onClick={() => {
              alert('Private');
            }}
          />
          <Edit
            size="micro"
            className="LinkRow-icon LinkRow-iconHover"
            onClick={() => {
              alert('Edit');
            }}
          />
        </div>
        <div className="LinkRow-leftTop">
          <Span bold className="LinkRow-title">
            {title}
          </Span>
          <div className="LinkRow-url">
            <A href={url}>
              <Span size="small">{url}</Span>
            </A>
          </div>
        </div>
        <div className="LinkRow-tags">
          {tags?.map((item) => (
            <A href={`/tags/${item.name}`} key={item.id} styled={false} frontend>
              <Tag className="LinkRow-tag" size="small">
                {item.name}
              </Tag>
            </A>
          ))}
        </div>
      </div>
      <div className="LinkRow-right">
        <img className="LinkRow-image" src={img} />
        <div className="LinkRow-rightEnd">
          <Vote className="LinkRow-vote" vote={statistics?.vote} changeVote={onVote} />
          <div className="LinkRow-stats">
            <div className="LinkRow-stat">
              <Span size="nano" className="LinkRow-statIcon">
                ▲
              </Span>
              32
            </div>
            <div className="LinkRow-stat">
              <Span size="nano" className="LinkRow-statIcon">
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

export default LinkRow;
