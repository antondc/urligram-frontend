import React from 'react';

import { ListState } from 'Modules/Lists/lists.types';
import { A, Border, Edit, Hr, Private, Span, Tag, Triangle } from '@antoniodcorrea/components';

import './ListRow.less';

interface ListRow extends Partial<ListState> {
  sinceTranslation: string;
}

export const ListRow: React.FC<ListRow> = ({
  id,
  name,
  tags,
  bookmarksIds,
  membersIds,
  createdAt,
  sinceTranslation,
}) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
      <div className="ListRow-leftTop">
        <div className="ListRow-icons">
          <Triangle filled size="micro" className="ListRow-icon ListRow-iconTriangle" />
          <Private
            size="micro"
            className="ListRow-icon ListRow-iconHover"
            onClick={() => {
              alert('Private');
            }}
          />
          <Edit
            size="micro"
            className="ListRow-icon ListRow-iconHover"
            onClick={() => {
              alert('Edit');
            }}
          />
        </div>
        <Hr spacer size="micro" />
        <Span bold className="LinkRow-title">
          {name}
        </Span>
        <Hr spacer size="micro" />
        <Span size="nano">
          <A href={'users'} styled frontend disabled={!membersIds.length}>
            {membersIds?.length} users
          </A>{' '}
          ·{' '}
          <A href={`lists/${id}`} styled frontend disabled={!bookmarksIds?.length}>
            {bookmarksIds?.length} bookmarks
          </A>{' '}
          · {sinceTranslation?.toLocaleLowerCase()} {createdAt}
        </Span>
      </div>
      <div className="ListRow-leftBottom">
        {tags?.map((item) => (
          <A href={`/tags/${item.name}`} key={item.id} styled={false} frontend>
            <Tag className="ListRow-tag" size="small">
              {item.name}
            </Tag>
          </A>
        ))}
      </div>
    </div>
    <div className="ListRow-right">
      <img className="ListRow-image" src={'img'} />
      <div className="ListRow-rightEnd">
        <div className="ListRow-stats">
          <div className="ListRow-stat">
            <Span size="nano" className="ListRow-statIcon">
              ▲
            </Span>
            32
          </div>
          <div className="ListRow-stat">
            <Span size="nano" className="ListRow-statIcon">
              ⚭
            </Span>
            124
          </div>
        </div>
      </div>
    </div>
  </Border>
);

export default ListRow;
