import React from 'react';

import A from 'Components/A';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr, Tag } from 'Vendor/components';

import './Tags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
}

export const Tags: React.FC<Props> = ({
  tags,
  tagsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
}) => (
  <div className="Tags">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border grow>
          <H4>Tags</H4>
          <Hr spacer />
          <Flex>
            {tagsLoading ? (
              <>...loading</>
            ) : (
              tags?.map((item) => (
                <A
                  className="Tags-tag"
                  href={`/bookmarks?filter[tags][]=${item.name}`}
                  key={item.id}
                  styled={false}
                  frontend
                >
                  <Tag size="small">{item.name}</Tag>
                </A>
              ))
            )}
          </Flex>
        </Border>
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
