import React from 'react';

import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { A, Flex, Frame, Hr, SortBy, Span } from 'Vendor/components';

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
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="small">
          <Span size="normal" weight="semiBold">
            Users following <A href={`/users/${userId}/folloing`}>@{user?.name}</A>
          </Span>
        </Frame>
        <Frame grow padding="none" shadow={false} borderBottom={false} borderTop={false}>
          <Flex horizontal="right">
            <SortBy
              options={[
                { label: 'Name', field: 'name' },
                { label: 'Login', field: 'login' },
                { label: 'Bookmarks', field: 'bookmarks' },
              ]}
              href={url}
              currentSort={sort}
              loading={usersLoading}
            />
          </Flex>
        </Frame>
        <Frame className="Following-tags" grow padding="small">
          <MainContent>
            {usersLoading ? (
              <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              usersCurrentIds?.map((id) => <UserRow id={id} key={id} />)
            )}
            {!usersLoading && !usersCurrentIds?.length && <Span weight="semiBold">ⵁ We didnt find any user.</Span>}
          </MainContent>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        <SidebarListTags
          title="User Most Followed Tags"
          href={`users/${userId}/bookmarks`}
          loading={userMostUsedTagsLoading}
          tags={userMostUsedTags}
        />
        <Hr spacer />
        <SidebarListTags title="Most Followed Tags" loading={mostUsedTagsLoading} tags={mostUsedTags} />
      </Sidebar>
    </Flex>
  </div>
);
