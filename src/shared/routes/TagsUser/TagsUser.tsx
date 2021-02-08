import React from 'react';

import A from 'Components/A';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr, Tag } from '@antoniodcorrea/components';

import './TagsUser.less';

interface Props {
  sessionId: string;
  tags: TagState[];
  tagsLoading: boolean;
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
}

export const TagsUser: React.FC<Props> = ({
  sessionId,
  tags,
  tagsLoading,
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
}) => (
  <div className="TagsUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="My Lists"
          href={`/users/${sessionId}/lists?sort=-createdAt&page[size]=10&filter[role]=admin`}
          loading={myListsLoading}
        >
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="Following Lists"
          href={`/user/${sessionId}/lists?sort=-createdAt&page[size]=10&filter[role]=editor,reader`}
          loading={followingListsLoading}
        >
          <SidebarListLists items={followingLists} />
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
        <SidebarBlock title="My Tags" loading={userMostUsedTagsLoading}>
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="My Followers"
          href={`/users/${sessionId}/followers?page[size]=10`}
          loading={mostFollowedUsersLoading}
        >
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
