import React from 'react';

import A from 'Components/A';
import { LinkState } from 'Modules/Links/links.types';
import { Border, Circle, Edit, Private, Span, Tag, Vote } from '@antoniodcorrea/components';

import './LinkRow.less';

interface LinkRow extends LinkState {
  onVote: (vote: boolean | null) => void;
}

export const LinkRow: React.FC<Partial<LinkRow>> = ({ id, title, url, tags = [], statistics, onVote, favicon }) => (
  <Border grow className="LinkRow" data-test-id="LinkRow" key={id}>
    <div className="LinkRow-left">
      <div className="LinkRow-icons">
        <img className="LinkRow-favicon" src={favicon} />
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
      <Vote className="LinkRow-vote" vote={statistics?.vote} changeVote={onVote} loading={statistics?.loading} />
      <div className="LinkRow-stats">
        <Span size="micro" className="LinkRow-stat">
          <Span size="small" className="LinkRow-statIcon">
            ▲
          </Span>
          32
        </Span>
        <Span size="micro" className="LinkRow-stat">
          <Span size="small" className="LinkRow-statIcon">
            ⚭
          </Span>
          124
        </Span>
      </div>
    </div>
  </Border>
);

export default LinkRow;
