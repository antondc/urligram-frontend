import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Bookmark, Border, Flex, Private, Space, Span, Tag, User } from '@antoniodcorrea/components';
import ListFollowButton from '../ListFollowButton';

import './ListRow.less';

interface Props extends Partial<ListState> {
  session?: SessionState;
  onEdit: () => void;
  onPrivateSwitch: () => void;
}

export const ListRow: React.FC<Props> = ({ id, name, tags, bookmarksIds, members, description, isPrivate }) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
      <Span size="normal" bold className="ListRow-title">
        <A href={`/lists/${id}`} frontend styled={false}>
          {name}
        </A>
      </Span>
      <Span className="ListRow-description" size="small">
        {description}
        <Space />
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
      <Flex horizontal="right" noWrap vertical="bottom">
        {isPrivate && <Private size="nano" className="ListRow-stat ListRow-private" />}
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
    <ListFollowButton listId={id} className="ListRow-followButton" />
  </Border>
);

export default ListRow;
