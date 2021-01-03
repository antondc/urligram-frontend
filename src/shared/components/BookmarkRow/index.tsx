import React from 'react';

import { A, Border, Edit, Link, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './BookmarkRow.less';

interface Props {
  id: number;
  title: string;
  url: string;
  tags: {
    id: number;
    name: string;
  }[];
  img: string;
  vote?: boolean;
}

export const BookmarkRow: React.FC<Props> = ({ id, title, url, tags = [], img, vote }) => {
  const onVote = (vote) => {
    console.log(vote, id);
  };

  return (
    <Border grow className="BookmarkRow" data-test-id="BookmarkRow">
      <div className="BookmarkRow-left">
        <div className="BookmarkRow-icons">
          <Link
            size="micro"
            className="BookmarkRow-icon"
            onClick={() => {
              alert('Link');
            }}
          />
          <Private
            size="micro"
            className="BookmarkRow-icon"
            onClick={() => {
              alert('Private');
            }}
          />
          <Edit
            size="micro"
            className="BookmarkRow-icon"
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
            <Tag className="BookmarkRow-tag" key={item.id} size="small">
              {item.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className="BookmarkRow-right">
        <img className="BookmarkRow-image" src={img} />
        <div className="BookmarkRow-rightEnd">
          <Vote className="BookmarkRow-vote" vote={vote} changeVote={onVote} />
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
