import React from 'react';

import { UserState } from 'Modules/Users/users.types';
import { A, Border, Hr, Span, Tag } from '@antoniodcorrea/components';

import './UserRow.less';

interface UserRow extends UserState {
  id: string;
  connections: number;
  ammountLists: number;
  ammountBookmarks: number;
  sinceTranslation: string;
}

export const UserRow: React.FC<UserRow> = ({
  id,
  name,
  image,
  tags,
  createdAt,
  connections,
  ammountLists,
  ammountBookmarks,
  sinceTranslation,
}) => (
  <Border grow className="UserRow" data-test-id="UserRow" key={'UserRow-' + id}>
    <div className="UserRow-left">
      <div className="UserRow-leftTop">
        <Span bold size="small" className="UserRow-title">
          @{name}
        </Span>
        <Hr spacer size="nano" />
        <div className="UserRow-details">
          <Span size="nano">
            <A href={'/lists'} styled frontend>
              {ammountLists} lists
            </A>{' '}
            ·{' '}
            <A href={'/bookmarks'} styled frontend>
              {ammountBookmarks} bookmarks
            </A>{' '}
            ·{' '}
            <A href={'/users'} styled frontend>
              {connections} connections
            </A>{' '}
            · {sinceTranslation.toLocaleLowerCase()} {createdAt}
          </Span>
        </div>
      </div>
      <div className="UserRow-tags">
        {tags?.map((item) => (
          <A href={`/tags/${item.name}`} key={item.id} styled={false} frontend>
            <Tag className="UserRow-tag" size="small">
              {item.name}
            </Tag>
          </A>
        ))}
      </div>
    </div>
    <div className="UserRow-right">
      <img className="UserRow-image" src={image} />
    </div>
  </Border>
);

export default UserRow;
