import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { Bookmark, Border, Edit, Flex, List, Private, Span, Tag, User } from '@antoniodcorrea/components';

import './ListRow.less';

export const ListRow: React.FC<Partial<ListState>> = ({ id, name, tags, bookmarksIds, membersIds, description }) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
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
      </Flex>
      <Flex horizontal="right" growVertical={false} noWrap>
        <Span size="micro" className="ListRow-stat">
          <Bookmark size="nano" className="ListRow-statIcon" /> {bookmarksIds?.length || 0}
        </Span>
        <Span size="micro" className="ListRow-stat">
          <User size="nano" className="ListRow-statIcon" /> {membersIds?.length || 0}
        </Span>
      </Flex>
    </div>
    <List className="ListRow-list" size="small" />
  </Border>
);

export default ListRow;
