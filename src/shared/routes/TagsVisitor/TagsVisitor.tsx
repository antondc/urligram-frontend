import React from 'react';

import A from 'Components/A';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { Border, Flex, H4, Hr, Tag } from '@antoniodcorrea/components';
import SidebarListUsers from '../../components/SidebarListUsers';
import { UserState } from '../../redux/modules/Users/users.types';

import './TagsVisitor.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  popularLists: ListState[];
  popularListsLoading: boolean;
  newLists: ListState[];
  newListsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
}

export const TagsVisitor: React.FC<Props> = ({
  tags,
  tagsLoading,
  popularLists,
  popularListsLoading,
  newLists,
  newListsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
}) => (
  <div className="TagsVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="Popular Lists"
          href="lists?sort=-members&page[size]=10&filter[role]=admin"
          loading={popularListsLoading}
        >
          <SidebarListLists items={popularLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Lists" href="lists?sort=-createdAt&page[size]=10" loading={newListsLoading}>
          <SidebarListLists items={newLists} />
        </SidebarBlock>
      </Sidebar>
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
                  className="TagsVisitor-tag"
                  href={`/links?filter[tags]=${item.name}`}
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
