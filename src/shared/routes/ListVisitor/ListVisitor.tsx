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
import { Border, Button, Flex, H4, Hr, PlusCircle, Tooltip } from '@antoniodcorrea/components';
import { SvgClickEvent } from '@antoniodcorrea/components/Svg/Svg.types';

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
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
  onListJoin: (e: SvgClickEvent) => void;
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
  tagsInThisList,
  tagsInThisListLoading,
  onListJoin,
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
          <Flex horizontal="between">
            <H4>{`Bookmarks in ${list?.name}`}</H4>
            <div id="ListVisitor-joinList">
              <PlusCircle className="ListVisitor-joinList" onClick={onListJoin} />
            </div>
            <Tooltip parentElementId={'ListVisitor-joinList'} content="Join this list" />
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
