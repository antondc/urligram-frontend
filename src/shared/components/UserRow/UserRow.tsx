import React from 'react';

import A from 'Components/A';
import UserFollowButton from 'Components/UserFollowButton';
import { UserState } from 'Modules/Users/users.types';
import { Space, Span, Tag } from 'Vendor/components';

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
  <div className="UserRow" data-test-id="UserRow" key={'UserRow-' + id}>
    <div className="UserRow-main">
      <A href={`users/${id}`} styled frontend>
        <Span bold size="small" className="UserRow-name">
          @{name}
        </Span>
      </A>
      <div className="UserRow-details">
        <Span size="nano">
          <A href={`users/${id}/lists`} styled frontend disabled={!ammountLists} underlined>
            <Span size="nano" bold>
              {ammountLists}
            </Span>
            <Space />
            lists
          </A>
          <Space />
          <Space />
          <Span size="nano" bold>
            ·
          </Span>
          <Space />
          <Space />
          <A href={`users/${id}/bookmarks`} styled frontend disabled={!ammountBookmarks} underlined>
            <Span size="nano" bold>
              {ammountBookmarks}
            </Span>
            <Space />
            bookmarks
          </A>
          <Space />
          <Space />
          <Span size="nano" bold>
            ·
          </Span>
          <Space />
          <Space />
          <A href={`users/${id}`} styled frontend disabled={!connections} underlined>
            <Span size="nano" bold>
              {connections}
            </Span>
            <Space />
            connections
          </A>
          <Space />
          <Space />
          <Span size="nano" bold>
            ·
          </Span>
          <Space />
          <Space />
          {sinceTranslation?.toLocaleLowerCase()} {createdAtFormatted}
        </Span>
      </div>
    </div>
    <div className="UserRow-tags">
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
    <div className="UserRow-imageContainer">
      <A href={`users/${id}`} styled={false} frontend>
        <img className="UserRow-image" src={image?.original} />
      </A>
    </div>
    <UserFollowButton className="UserRow-followButton" userId={id} />
  </div>
);

export default UserRow;
