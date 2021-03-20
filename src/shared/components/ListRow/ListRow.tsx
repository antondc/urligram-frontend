import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Edit, Flex, Private, Span, Tag, Triangle } from '@antoniodcorrea/components';

import './ListRow.less';

export const ListRow: React.FC<Partial<ListState>> = ({
  id,
  name,
  tags,
  bookmarksIds,
  membersIds,
  createdAt,
  description,
}) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
      <div className="ListRow-icons">
        <Flex vertical="center" horizontal="left">
          <Span className="ListRow-icon" size="small" bold>
            ≡
          </Span>
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
        </Flex>
      </div>
      <Span size="normal" bold className="ListRow-title">
        <A href={`/lists/${id}`} frontend styled={false}>
          {name}
        </A>
      </Span>
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
      <Span size="micro" className="ListRow-stat">
        <Span size="nano" className="ListRow-statIcon">
          ⚭
        </Span>{' '}
        {bookmarksIds?.length || 0}
      </Span>
      <Span size="micro" className="ListRow-stat">
        <Span size="nano" className="ListRow-statIcon">
          @
        </Span>{' '}
        {membersIds?.length || 0}
      </Span>
      <Span size="micro" className="ListRow-stat">
        {createdAt}
      </Span>
    </div>
  </Border>
);

export default ListRow;
