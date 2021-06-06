import React from 'react';

import A from 'Components/A';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Flex, Frame, Hr, SortBy, Space, Tag } from 'Vendor/components';

import './Tags.less';

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

export const Tags: React.FC<Props> = ({
  tags,
  tagsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  url,
  sort,
}) => (
  <div className="Tags">
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
            />
          </Flex>
        </Frame>
        <Frame grow>
          <Flex>
            {tagsLoading ? (
              <SidebarListTagsSkeleton />
            ) : (
              tags?.map((item) => (
                <A
                  className="Tags-tag"
                  href={`/bookmarks?filter[tags][]=${item.name}`}
                  key={item.id}
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
        </Frame>
      </Main>
      <Sidebar>
        <SidebarBlock
          title="Following Users"
          href={'/users?sort=-followers&page[size]=10'}
          loading={mostFollowedUsersLoading}
        >
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Users" href={'/users?sort=-createdAt&page[size]=10'} loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
