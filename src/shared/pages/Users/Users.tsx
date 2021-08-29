import React from 'react';
import Helmet from 'react-helmet';

import Clock from 'Assets/svg/spinner6.svg';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListUsers from 'Components/SidebarListUsers';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy } from 'Vendor/components';

import './Users.less';

export interface Props {
  usersCurrentIds: string[];
  usersLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
}

export const Users: React.FC<Props> = ({
  usersCurrentIds,
  usersLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  page,
  totalItems,
  url,
  sort,
  allTags,
  currentQueryParamFilterTags,
  tagsSearchFormatted,
  onInputChange,
  onChange,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · All Users`} />
    <div className="Users">
      <div className="Users-header">
        <Select
          className="Bookmarks-select"
          label="Select tags"
          value={currentQueryParamFilterTags}
          defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
          options={[...tagsSearchFormatted, ...allTags.map((item) => ({ label: item.name, value: item.name }))].filter(
            (v, i, a) => a.findIndex((t) => t.value === v.value) === i
          )}
          onInputChange={onInputChange}
          onChange={onChange}
          maxItems={4}
          grow
          hideLabelOnFill
        />
        <SortBy
          options={[{ label: 'Created at', field: 'createdAt', icon: Clock }]}
          href={url}
          currentSort={sort}
          loading={usersLoading}
        />
      </div>
      <div className="Users-users">
        {usersLoading ? (
          <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          usersCurrentIds?.map((id) => <UserRow id={id} key={id} />)
        )}
        {!usersLoading && !usersCurrentIds?.length && (
          <div className="Bookmarks-noResults">ⵁ We didn find any user.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
    </div>
    <Sidebar>
      <SidebarListUsers
        className="Users-sidebarListUsersFirst"
        title="Most Followed Users"
        href="users?sort=-followers&page[size]=10"
        loading={mostFollowedUsersLoading}
        users={mostFollowedUsers}
      />
      <SidebarListUsers
        title="New Users"
        href="users?sort=createdAt&page[size]=10"
        loading={newUsersLoading}
        users={newUsers}
      />
    </Sidebar>
  </>
);
