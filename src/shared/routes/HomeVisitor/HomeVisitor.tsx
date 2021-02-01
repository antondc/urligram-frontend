import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { A, Border, Flex, H4, Hr, Tag } from '@antoniodcorrea/components';

import './HomeVisitor.less';

export interface Props {
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
  newLists: ListState[];
  newListsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  allTags: TagState[];
  allTagsLoading: boolean;
  bookmarksCurrentIds: number[];
  bookmarksLoading: boolean;
}

export const HomeVisitor: React.FC<Props> = ({
  mostFollowedLists,
  mostFollowedListsLoading,
  newLists,
  newListsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  allTags,
  allTagsLoading,
  bookmarksCurrentIds,
  bookmarksLoading,
}) => (
  <div className="HomeVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="Most Followed Lists"
          href="lists?sort=members&page[size]=10"
          loading={mostFollowedListsLoading}
        >
          <SidebarListLists items={mostFollowedLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Lists" href="lists?sort=createdat&page[size]=10" loading={newListsLoading}>
          <SidebarListLists items={newLists} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
      <Main>
        <Border className="HomeVisitor-tags" grow>
          <H4>Trending Tags</H4>
          <Hr spacer />
          {allTagsLoading ? (
            <div>...loading</div>
          ) : (
            allTags?.map((item) => (
              <A
                className="SidebarListTags-tag"
                href={`/tags/${item.name}`}
                key={`SidebarListTags-tags-${item.id}`}
                styled={false}
                frontend
              >
                <Tag size="big">{item.name}</Tag>
              </A>
            ))
          )}
        </Border>
        <Hr spacer />
        <Border className="HomeVisitor-tags" grow>
          <H4>Bookmarks</H4>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup />
          ) : (
            bookmarksCurrentIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock
          title="Most Followed Users"
          href="users?sort=followers&page[size]=10"
          loading={mostFollowedUsersLoading}
        >
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdat&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
