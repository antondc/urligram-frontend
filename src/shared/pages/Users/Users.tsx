import React from 'react';

import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Flex, Frame, Hr, SortBy, Span } from 'Vendor/components';

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
  <div className="Users">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="none" shadow={false} borderBottom={false}>
          <Flex horizontal="right">
            <SortBy options={[{ label: 'Created at', field: 'createdAt' }]} href={url} currentSort={sort} />
          </Flex>
        </Frame>
        <Frame className="Users-users" grow padding="small">
          <MainContent>
            {usersLoading ? (
              <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              usersCurrentIds?.map((id) => <UserRow id={id} key={id} />)
            )}
            {!usersLoading && !usersCurrentIds?.length && <Span weight="semiBold">ⵁ We didn find any user.</Span>}
          </MainContent>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        <SidebarBlock
          title="Most Followed Users"
          href="users?sort=-followers&page[size]=10"
          loading={mostFollowedUsersLoading}
        >
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdAt&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
