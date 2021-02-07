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
import { Border, Flex, H4, Hr } from '@antoniodcorrea/components';

import './FollowersVisitor.less';

export interface Props {
  usersCurrentIds: string[];
  usersLoading: boolean;
  userLists: ListState[];
  userListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  mostFollowedTags: TagState[];
  mostFollowedTagsLoading: boolean;
}

export const FollowersVisitor: React.FC<Props> = ({
  usersCurrentIds,
  usersLoading,
  userLists,
  userListsLoading,
  followingLists,
  followingListsLoading,
  mostFollowedTags,
  mostFollowedTagsLoading,
}) => (
  <div className="FollowersVisitor">
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
        <Border className="FollowersVisitor-tags" grow>
          <H4>Users</H4>
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
          title="Most Followed Users"
          href="users?sort=-followers&page[size]=10"
          loading={mostFollowedTagsLoading}
        >
          <SidebarListTags items={mostFollowedTags} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
    </Flex>
  </div>
);
