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
  currentPathName: string;
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
  currentPathName,
}) => (
  <div className="UserRow" data-test-id="UserRow" key={'UserRow-' + id}>
    <div className="UserRow-main">
      <A href={`users/${id}`} styled frontend>
        <Span weight="semiBold" size="small" className="UserRow-name">
          @{name}
        </Span>
      </A>
      <div className="UserRow-details">
        <Span size="nano">
          {!!ammountLists && (
            <>
              <Span size="nano" weight="extraBold">
                {ammountLists}
              </Span>
              <Space />
              <A href={`users/${id}/lists`} styled frontend disabled={!ammountLists} underlined>
                lists
              </A>
              <Space />
              <Space />
              <Span size="nano" weight="semiBold">
                ·
              </Span>
              <Space />
              <Space />
            </>
          )}
          {!!ammountBookmarks && (
            <>
              <Span size="nano" weight="extraBold">
                {ammountBookmarks}
              </Span>
              <Space />
              <A href={`users/${id}/bookmarks`} styled frontend disabled={!ammountBookmarks} underlined>
                bookmarks
              </A>
              <Space />
              <Space />
              <Span size="nano" weight="semiBold">
                ·
              </Span>
              <Space />
              <Space />
            </>
          )}
          {!!ammountBookmarks && (
            <>
              <Span size="nano" weight="extraBold">
                {connections}
              </Span>
              <Space />
              <A href={`users/${id}`} styled frontend disabled={!connections} underlined>
                connections
              </A>
              <Space />
              <Space />
              <Span size="nano" weight="semiBold">
                ·
              </Span>
              <Space />
              <Space />
            </>
          )}
          <span className="UserRow-since">
            {sinceTranslation?.toLocaleLowerCase()} {createdAtFormatted}
          </span>
        </Span>
      </div>
    </div>
    <div className="UserRow-tags">
      {tags?.map((item) => (
        <A
          className="UserRow-tag"
          href={`${currentPathName}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag>{item.name}</Tag>
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
