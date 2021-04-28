import React from 'react';

import A from 'Components/A';
import UserFollowButton from 'Components/UserFollowButton';
import { UserState } from 'Modules/Users/users.types';
import { Border, Span, Tag } from 'Vendor/components';

import './UserRow.less';

interface UserRow extends Partial<UserState> {
  id: string;
  connections: number;
  ammountLists: number;
  ammountBookmarks: number;
  sinceTranslation: string;
  createdAtFormatted: string;
}

export const UserRow: React.FC<UserRow> = ({
  id,
  name,
  image,
  tags,
  createdAtFormatted,
  connections,
  ammountLists,
  ammountBookmarks,
  sinceTranslation,
}) => (
  <Border grow className="UserRow" data-test-id="UserRow" key={'UserRow-' + id}>
    <div className="UserRow-left">
      <A href={`users/${id}`} styled frontend>
        <Span bold size="small" className="UserRow-title">
          @{name}
        </Span>
      </A>
      <Span size="nano">
        <A href={`users/${id}/lists`} styled frontend disabled={!ammountLists}>
          {ammountLists} lists
        </A>
        <span className="UserRow-dot">·</span>
        <A href={`users/${id}/bookmarks`} styled frontend disabled={!ammountBookmarks}>
          {ammountBookmarks} bookmarks
        </A>
        <span className="UserRow-dot">·</span>
        <A href={`users/${id}`} styled frontend disabled={!connections}>
          {connections} connections
        </A>
        <span className="UserRow-dot">·</span> {sinceTranslation?.toLocaleLowerCase()} {createdAtFormatted}
      </Span>
    </div>
    <div className="UserRow-center">
      {tags?.map((item) => (
        <A
          className="UserRow-tag"
          href={`/bookmarks?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag variant="simple" size="nano">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="UserRow-right">
      <A href={`users/${id}`} styled={false} frontend>
        <img className="UserRow-image" src={image} />
      </A>
    </div>
    <UserFollowButton className="UserRow-followButton" userId={id} />
  </Border>
);

export default UserRow;
