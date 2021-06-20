import React from 'react';

import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListUsers from 'Components/SidebarListUsers';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Hr, SortBy } from 'Vendor/components';

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
}) => (
  <>
    <div className="Users">
      <div className="Users-header">
        <SortBy
          options={[{ label: 'Created at', field: 'createdAt' }]}
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
          <span className="Bookmarks-noResults">ⵁ We didn find any user.</span>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
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
