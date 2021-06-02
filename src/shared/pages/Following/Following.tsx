import React from 'react';

import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Flex, Frame, H4, Hr, SortBy, Span } from 'Vendor/components';

import './Following.less';

export interface Props {
  user: UserState;
  userId: string;
  usersCurrentIds: string[];
  usersLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
}

export const Following: React.FC<Props> = ({
  user,
  userId,
  usersCurrentIds,
  usersLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
  page,
  totalItems,
  url,
  sort,
}) => (
  <div className="Following">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Flex horizontal="right">
          <SortBy
            options={[
              { label: 'Name', field: 'name' },
              { label: 'Login', field: 'login' },
              { label: 'Bookmarks', field: 'bookmarks' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="small" />
        <Frame className="Following-tags" grow>
          <H4>Users followed by @{user?.name}</H4>
          <Hr spacer />
          {usersLoading ? (
            <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
          ) : (
            usersCurrentIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer size="small" />}
                <UserRow id={id} />
              </React.Fragment>
            ))
          )}
          {!usersLoading && !usersCurrentIds?.length && <Span bold>ⵁ We didnt find any user.</Span>}
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Frame>
      </Main>
      <Sidebar>
        <SidebarBlock
          title="User Most Followed Tags"
          href={`users/${userId}/bookmarks`}
          loading={userMostUsedTagsLoading}
        >
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Most Followed Tags" loading={mostUsedTagsLoading}>
          <SidebarListTags items={mostUsedTags} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
