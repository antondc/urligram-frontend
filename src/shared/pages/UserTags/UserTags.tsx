import React from 'react';

import A from 'Components/A';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Sidebar from 'Components/Sidebar';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Flex, Frame, Hr, SortBy, Space, Tag } from 'Vendor/components';

import './UserTags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  url: string;
  sort: string;
}

export const UserTags: React.FC<Props> = ({
  tags,
  tagsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  url,
  sort,
}) => (
  <div className="UserTags">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="none" shadow={false} borderBottom={false}>
          <Flex horizontal="right" vertical="top" growHorizontal>
            <SortBy
              options={[
                { label: 'Bookmarks', field: 'count' },
                { label: 'Name', field: 'name' },
              ]}
              href={url}
              currentSort={sort}
              loading={tagsLoading}
            />
          </Flex>
        </Frame>
        <Frame grow padding="normal">
          <MainContent>
            <Flex>
              {tagsLoading ? (
                <SidebarListTagsSkeleton />
              ) : (
                tags?.map((item) => (
                  <A
                    className="UserTags-tag"
                    href={`/bookmarks?filter[tags][]=${item?.name}`}
                    key={item?.id}
                    styled={false}
                    frontend
                  >
                    <Tag size="medium">
                      {item?.name}
                      <Space />
                      {item?.count}
                    </Tag>
                  </A>
                ))
              )}
            </Flex>
          </MainContent>
        </Frame>
      </Main>
      <Sidebar>
        <SidebarListUsers
          title="Following Users"
          href={'/users?sort=-followers&page[size]=10'}
          loading={mostFollowedUsersLoading}
          users={mostFollowedUsers}
        />
        <SidebarListUsers
          title="Following Users"
          href={'/users?sort=-createdAt&page[size]=10'}
          loading={newUsersLoading}
          users={newUsers}
        />
      </Sidebar>
    </Flex>
  </div>
);
