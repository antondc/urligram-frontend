import React from 'react';

import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr } from '@antoniodcorrea/components';

import './FollowingVisitor.less';

export interface Props {
  user: UserState;
  userId: string;
  usersCurrentIds: string[];
  usersLoading: boolean;
  userLists: ListState[];
  userListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
}

export const FollowingVisitor: React.FC<Props> = ({
  user,
  userId,
  usersCurrentIds,
  usersLoading,
  userLists,
  userListsLoading,
  followingLists,
  followingListsLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
}) => (
  <div className="FollowingVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Most Followed Lists" href="lists?sort=-members&page[size]=10" loading={userListsLoading}>
          <SidebarListLists items={userLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Lists" href="lists?sort=-createdat&page[size]=10" loading={followingListsLoading}>
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
      <Main>
        <Border className="FollowingVisitor-tags" grow>
          <H4>Users followed by @{user?.name}</H4>
          <Hr spacer />
          {usersLoading ? (
            <UserRowSkeletonGroup />
          ) : (
            usersCurrentIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <UserRow id={id} />
              </React.Fragment>
            ))
          )}
        </Border>
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
