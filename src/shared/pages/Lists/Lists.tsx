import React from 'react';

import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Border, FadeInOut, Flex, H4, Hr, SortBy } from '@antoniodcorrea/components';

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
        <Flex horizontal="right">
          <SortBy
            options={[
              { label: 'Date', field: 'createdAt' },
              { label: 'Updated', field: 'updatedAt' },
              { label: 'Members', field: 'members' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="small" />
        <Border grow>
          <H4>My Lists</H4>
          <Hr spacer size="small" />
          <FadeInOut valueToUpdate={listsIdsLoading} speed="fastest" appear>
            {listsIdsLoading ? (
              <ListRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              listsIds?.map((id, index) => (
                <React.Fragment key={id}>
                  {!!index && <Hr spacer size="small" />}
                  <ListRow id={id} />
                </React.Fragment>
              ))
            )}
          </FadeInOut>
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Most Used Tags" loading={mostUsedTagsLoading}>
          <SidebarListTags items={mostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdAt&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
