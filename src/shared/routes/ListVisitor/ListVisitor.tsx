import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Flex, H4, Hr } from '@antoniodcorrea/components';

import './ListVisitor.less';

interface Props {
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
  similarLists: ListState[];
  similarListsLoading: boolean;
  usersInThisList: UserState[];
  usersInThisListLoading: boolean;
}

export const ListVisitor: React.FC<Props> = ({
  list,
  bookmarksIds,
  bookmarksLoading,
  mostFollowedLists,
  mostFollowedListsLoading,
  similarLists,
  similarListsLoading,
  usersInThisList,
  usersInThisListLoading,
}) => (
  <div className="ListVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="Most Followed Lists"
          href="lists?sort=-members&page[size]=10"
          loading={mostFollowedListsLoading}
        >
          <SidebarListLists items={mostFollowedLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Similar Lists" loading={similarListsLoading}>
          <SidebarListLists items={similarLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <H4>{`Bookmarks in ${list?.name}`}</H4>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup />
          ) : (
            bookmarksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
          <Hr spacer size="big" />
          <Flex horizontal="center">
            <Button text="Load more" />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="People in this list" loading={usersInThisListLoading}>
          <SidebarListUsers items={usersInThisList} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
    </Flex>
  </div>
);
