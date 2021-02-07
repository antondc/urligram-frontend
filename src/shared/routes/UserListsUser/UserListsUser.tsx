import React from 'react';

import A from 'Components/A';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListRow from 'Components/ListRow';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Fade, Flex, H4, Hr } from '@antoniodcorrea/components';

import './UserListsUser.less';

interface Props {
  userId: string;
  sessionId: string;
  user: UserState;
  listsIds: number[];
  listsLoading: boolean;
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
}

export const UserListsUser: React.FC<Props> = ({
  userId,
  user,
  listsIds,
  listsLoading,
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
}) => (
  <div className="UserListsUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="My Lists"
          href={`/users/${userId}/lists?sort=-createdAt&page[size]=10&filter[role]=admin`}
          loading={myListsLoading}
        >
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock
          title="Following Lists"
          href="lists?sort=-createdAt&page[size]=10&filter[role]=editor,reader"
          loading={followingListsLoading}
        >
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <H4>
            Lists of <A href={`/users/${userId}`}>@{user?.name}</A>
          </H4>
          <Hr spacer />
          {listsLoading ? (
            <BookmarkRowSkeletonGroup />
          ) : (
            listsIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <ListRow id={id} />
              </React.Fragment>
            ))
          )}
          <Hr spacer size="big" />
          <Flex horizontal="center">
            <Fade mounted={!!listsIds?.length} speed="fastest">
              <Button text="Load more" />
            </Fade>
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="My Tags" loading={userMostUsedTagsLoading}>
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="My Followers" href={`users/${userId}/followers`} loading={mostFollowedUsersLoading}>
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
