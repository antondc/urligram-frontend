import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { A, Border, Flex, H4, Hr } from '@antoniodcorrea/components';

import './HomeUser.less';

interface Props {
  user: UserState;
  bookmarksLoading: boolean;
  sessionId: string;
  myLists: ListState[];
  myListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  myTags: TagState[];
  myTagsLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
}

export const HomeUser: React.FC<Props> = ({
  user,
  bookmarksLoading,
  sessionId,
  myLists,
  myListsLoading,
  followingLists,
  followingListsLoading,
  myTags,
  myTagsLoading,
  followingUsers,
  followingUsersLoading,
}) => (
  <div className="HomeUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="My Lists" href={`users/${sessionId}/lists`} loading={myListsLoading}>
          <SidebarListLists items={myLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Lists" href={`users/${sessionId}/lists`} loading={followingListsLoading}>
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border className="HomeUser-main">
          <A href={`users/${sessionId}`} frontend>
            <H4>My Bookmarks</H4>
          </A>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            user?.bookmarksIds?.map(
              (id, index) =>
                index < 5 && (
                  <React.Fragment key={id}>
                    {!!index && <Hr spacer />}
                    <BookmarkRow id={id} />
                  </React.Fragment>
                )
            )
          )}
        </Border>
        <Hr spacer />
        <Border className="HomeUser-main">
          <A href={`users/${sessionId}/recommended`} frontend>
            <H4>Recommended Bookmarks</H4>
          </A>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            user?.bookmarksIds?.map(
              (id, index) =>
                index < 5 && (
                  <React.Fragment key={id}>
                    {!!index && <Hr spacer />}
                    <BookmarkRow id={id} />
                  </React.Fragment>
                )
            )
          )}
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="My Tags" href={`users/${sessionId}/tags`} loading={myTagsLoading}>
          <SidebarListTags items={myTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Users" href={`users/${sessionId}/following`} loading={followingUsersLoading}>
          <SidebarListUsers items={followingUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
