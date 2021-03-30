import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Cross, Edit, Flex, List, Private, Span, Tag } from '@antoniodcorrea/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  createdAtFormatted: string;
}

export const ListRow: React.FC<Props> = ({ id, name, tags, bookmarksIds, membersIds, createdAt, description }) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
      <div className="ListRow-icons">
        <Flex vertical="center" horizontal="left">
          <List size="micro" className="ListRow-icon" />
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
      <Flex vertical="center" horizontal="right" growVertical={false}>
        <Private
          size="micro"
          className="ListRow-action"
          onClick={() => {
            alert('Private');
          }}
        />
        <Edit
          size="micro"
          className="ListRow-action"
          onClick={() => {
            alert('Edit');
          }}
        />
        <Cross
          size="micro"
          className="ListRow-action"
          onClick={() => {
            alert('Delete');
          }}
        />
      </Flex>
      <Flex horizontal="right" growVertical={false}>
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
      </Flex>
      <Span size="micro" className="ListRow-stat">
        {createdAt}
      </Span>
    </div>
  </Border>
);

export default ListRow;
