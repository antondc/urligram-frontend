import React from 'react';

import User from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { TagNew } from 'Components/TagNew';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { UserState } from 'Modules/Users/users.types';
import { Space, Tag } from '@antoniodcorrea/components';
import UserImageWithFollow from '../UserImageWithFollow';

import './UserRowNew.less';

interface UserRowNew extends Partial<UserState> {
  id: string;
  connections: number;
  ammountLists: number;
  ammountBookmarks: number;
  sinceTranslation: string;
  createdAtFormatted: string;
  currentGlossary: GlossaryState;
}

export const UserRowNew: React.FC<UserRowNew> = ({
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
  <div className="UserRowNew" data-test-id="UserRowNew" key={'UserRowNew-' + id}>
    <div className="UserRowNew-title">
      <User className="UserRowNew-titleIcon" />
      <A href={`users/${id}`} frontend styled={false}>
        {name}
      </A>
    </div>
    <div className="UserRowNew-description">
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
      <span className="UserRowNew-since">
        {sinceTranslation} {createdAtFormatted}
      </span>
    </div>
    <div className="UserRowNew-tags">
      {tags?.map((item) => (
        <A
          className="UserRowNew-tag"
          href={`/users/${id}/bookmarks?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <TagNew>{item.name}</TagNew>
        </A>
      ))}
    </div>
    <div className="UserRowNew-icons">
      <UserImageWithFollow userId={id} userName={name} image={image?.original} />
    </div>
  </div>
);
