import React from 'react';

import User from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import UserFollowButton from 'Components/UserFollowButton';
import { UserState } from 'Modules/Users/users.types';
import { Space, Tag } from 'Vendor/components';

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
    <div className="UserRow-title">
      <A href={`users/${id}`} frontend styled={false}>
        <User className="UserRow-titleIcon" />
        {name}
      </A>
    </div>
    <div className="UserRow-description">
      {!!ammountLists && (
        <>
          {ammountLists}
          <Space />
          <A href={`users/${id}/lists`} frontend disabled={!ammountLists} underlined styled={false}>
            lists
          </A>
          <Space />
          <Space />
          ·
          <Space />
          <Space />
        </>
      )}
      {!!ammountBookmarks && (
        <>
          {ammountBookmarks}
          <Space />
          <A href={`users/${id}/bookmarks`} frontend disabled={!ammountBookmarks} underlined styled={false}>
            bookmarks
          </A>
          <Space />
          <Space />
          ·
          <Space />
          <Space />
        </>
      )}
      {!!ammountBookmarks && (
        <>
          {connections}
          <Space />
          <A href={`users/${id}`} frontend disabled={!connections} underlined styled={false}>
            connections
          </A>
          <Space />
          <Space />
          ·
          <Space />
          <Space />
        </>
      )}
      <span className="UserRow-since">
        {sinceTranslation?.toLocaleLowerCase()} {createdAtFormatted}
      </span>
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
    <div className="UserRow-icons">
      <div className="UserRow-userImage">
        <A href={`users/${id}`} frontend styled={false}>
          <img className="UserRow-image" src={image?.original} />
        </A>
        <UserFollowButton className="UserRow-followButton" userId={id} />
      </div>
    </div>
  </div>
);
