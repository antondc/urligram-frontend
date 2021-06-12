import React from 'react';

import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Flex, Frame, Hr, SortBy, Span } from 'Vendor/components';

import './Lists.less';

interface Props {
  listsIds: number[];
  listsIdsLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
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

export const Lists: React.FC<Props> = ({
  listsIds,
  listsIdsLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  newUsers,
  newUsersLoading,
  url,
  page,
  totalItems,
  sort,
}) => (
  <div className="Lists">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="none" shadow={false} borderBottom={false}>
          <Flex horizontal="right">
            <SortBy
              options={[
                { label: 'Date', field: 'createdAt' },
                { label: 'Updated', field: 'updatedAt' },
                { label: 'Members', field: 'members' },
              ]}
              href={url}
              currentSort={sort}
              loading={listsIdsLoading}
            />
          </Flex>
        </Frame>
        <Frame grow padding="small">
          <MainContent>
            {listsIdsLoading ? (
              <ListRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              listsIds?.map((id) => <ListRow id={id} key={id} />)
            )}
            {!listsIdsLoading && !listsIds?.length && <Span weight="semiBold">ⵁ We didn find any list.</Span>}
          </MainContent>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        <SidebarBlock title="Most Used Tags" loading={mostUsedTagsLoading}>
          <SidebarListTags items={mostUsedTags} />
        </SidebarBlock>
        <Hr size="nano" />
        <SidebarListUsers
          title="New Users"
          users={newUsers}
          loading={newUsersLoading}
          href="users?sort=createdAt&page[size]=10"
        />
        <Hr size="nano" />
      </Sidebar>
    </Flex>
  </div>
);
