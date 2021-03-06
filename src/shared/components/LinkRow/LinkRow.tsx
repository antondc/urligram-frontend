import React from 'react';

import { LinkState } from 'Modules/Links/Links.types';
import { A, Border, Circle, Edit, Hr, Private, Span, SvgIcon, Tag, Vote } from '@antoniodcorrea/components';

import './LinkRow.less';

interface LinkRow extends LinkState {
  onVote: (vote: boolean | null) => void;
}

export const LinkRow: React.FC<LinkRow> = ({ id, title, url, tags = [], statistics, onVote }) => (
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
      <Span bold className="LinkRow-title">
        {title}
      </Span>
      <A href={url} targetBlank>
        <Span className="LinkRow-url" size="small">
          {url}
        </Span>
      </A>
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
      <Vote className="LinkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      <div className="LinkRow-stats">
        <div className="LinkRow-stat">
          <Span size="small" className="LinkRow-statIcon">
            ▲
          </Span>
          32
        </div>
        <div className="LinkRow-stat">
          <Span size="small" className="LinkRow-statIcon">
            ⚭
          </Span>
          124
        </div>
      </div>
    </div>
  </Border>
);

export default LinkRow;
