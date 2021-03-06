import React from 'react';

import { ListState } from 'Modules/Lists/lists.types';
import { A, Border, Edit, Private, Span, Tag, Triangle } from '@antoniodcorrea/components';

import './ListRow.less';

interface ListRow extends Partial<ListState> {
  sinceTranslation: string;
}

export const ListRow: React.FC<ListRow> = ({
  id,
  name,
  tags,
  // bookmarksIds,
  // membersIds,
  // createdAt,
  // sinceTranslation,
  description,
}) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
      <div className="ListRow-icons">
        <Triangle filled size="nano" className="ListRow-icon ListRow-iconTriangle" />
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
      <A href={`/lists/${id}`} frontend>
        <Span size="normal" bold className="ListRow-title">
          {name}
        </Span>
      </A>
      <Span className="ListRow-description" size="small">
        {description}
      </Span>
    </div>
    <div className="ListRow-center">
      {tags?.map((item) => (
        <A className="ListRow-tag" href={`/links?filter[tags][]=${item.name}`} key={item.id} styled={false} frontend>
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="ListRow-right">
      <div className="ListRow-stat">
        <Span size="nano" className="ListRow-statIcon">
          ▲ 32
        </Span>
      </div>
      <div className="ListRow-stat">
        <Span size="nano" className="ListRow-statIcon">
          ⚭ 124
        </Span>
      </div>
      <Span size="nano" className="ListRow-stat">
        14 07 2021
      </Span>
    </div>
  </Border>
);

export default ListRow;
