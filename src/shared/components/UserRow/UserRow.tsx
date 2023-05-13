import React from 'react';

import User from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { UserState } from 'Modules/Users/users.types';
import { Img, Space, Tag } from '@antoniodcorrea/components';
import UserImageWithFollow from '../UserImageWithFollow';

import './UserRow.less';

interface UserRow extends Partial<UserState> {
  id: string;
  connections: number;
  ammountLists: number;
  ammountBookmarks: number;
  sinceTranslation: string;
  createdAtFormatted: string;
  currentGlossary: GlossaryState;
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
  currentGlossary,
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
            {currentGlossary.lists}
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
            {currentGlossary.bookmarks}
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
            {connections === 1 ? currentGlossary.connection : currentGlossary.connections}
          </A>
          <Space />
          <Space />
          ·
          <Space />
          <Space />
        </>
      )}
      <span className="UserRow-since">
        {sinceTranslation} {createdAtFormatted}
      </span>
    </div>
    <div className="UserRow-tags">
      {tags?.map((item) => (
        <A
          className="UserRow-tag"
          href={`/users/${id}/bookmarks?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag>{item.name}</Tag>
        </A>
      ))}
    </div>
    <div className="UserRow-icons">
      <UserImageWithFollow userId={id} userName={name} image={image?.original} />
    </div>
  </div>
);
