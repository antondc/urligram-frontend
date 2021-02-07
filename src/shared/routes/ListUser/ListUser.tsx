import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListBookmarks from 'Components/SidebarListBookmarks';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Flex, H4, Hr, PlusCircle, Tooltip } from '@antoniodcorrea/components';
import { SvgClickEvent } from '@antoniodcorrea/components/Svg/Svg.types';

import './ListUser.less';

interface Props {
  sessionId: string;
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  myRecentBookmarks: BookmarkState[];
  myRecentBookmarksLoading: boolean;
  similarLists: ListState[];
  similarListsLoading: boolean;
  usersInThisList: UserState[];
  usersInThisListLoading: boolean;
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
  onListJoin: (e: SvgClickEvent) => void;
}

export const ListUser: React.FC<Props> = ({
  sessionId,
  list,
  bookmarksIds,
  bookmarksLoading,
  myRecentBookmarks,
  myRecentBookmarksLoading,
  similarLists,
  similarListsLoading,
  usersInThisList,
  usersInThisListLoading,
  tagsInThisList,
  tagsInThisListLoading,
  onListJoin,
}) => (
  <div className="ListUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="My Recent bookmarks"
          href={`users/${sessionId}/bookmarks`}
          loading={myRecentBookmarksLoading}
        >
          <SidebarListBookmarks items={myRecentBookmarks} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Similar Lists" loading={similarListsLoading}>
          <SidebarListLists items={similarLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <Flex horizontal="between">
            <H4>Bookmarks in {list?.name}</H4>
            <div id="ListUser-joinList">
              <PlusCircle className="ListUser-joinList" onClick={onListJoin} />
            </div>
            <Tooltip parentElementId={'ListUser-joinList'} content="Join this list" />
          </Flex>
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
        <Hr spacer />{' '}
        <SidebarBlock title="Tags In This List" loading={tagsInThisListLoading}>
          <SidebarListTags items={tagsInThisList} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
