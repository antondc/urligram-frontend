import React from 'react';

import A from 'Components/A';
import ListFollowButton from 'Components/ListFollowButton';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Bookmark, Flex, Space, Span, Tag, User } from 'Vendor/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  session?: SessionState;
}

export const ListRow: React.FC<Props> = ({ id, name, tags, bookmarksIds, members, description }) => (
  <div className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-main">
      <Span size="normal" weight="semiBold" className="ListRow-title">
        <A href={`/lists/${id}`} frontend styled={false}>
          {name}
        </A>
      </Span>
      <Span className="ListRow-description" size="nano">
        {description}
        <Space />
      </Span>
    </div>
    <div className="ListRow-tags">
      {tags?.map((item) => (
        <A
          className="ListRow-tag"
          href={`/bookmarks?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="ListRow-icons">
      <ListFollowButton listId={id} size="small" />
      <Flex horizontal="right" growVertical={false} vertical="bottom" noWrap>
        <Bookmark size="nano" className="ListRow-icon" />
        <Span size="micro" className="ListRow-iconText">
          {bookmarksIds?.length || 0}
        </Span>
        <User size="nano" className="ListRow-icon" />
        <Span size="micro" className="ListRow-iconText">
          {members?.length || 0}
        </Span>
      </Flex>
    </div>
  </div>
);

export default ListRow;
