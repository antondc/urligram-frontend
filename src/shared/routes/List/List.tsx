import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Flex, H4, Hr, PlusCircle, Tooltip } from '@antoniodcorrea/components';
import { SvgClickEvent } from '@antoniodcorrea/components/Svg/Svg.types';

import './List.less';

interface Props {
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  usersInThisList: UserState[];
  usersInThisListLoading: boolean;
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
  onListJoin: (e: SvgClickEvent) => void;
}

export const List: React.FC<Props> = ({
  list,
  bookmarksIds,
  bookmarksLoading,
  usersInThisList,
  usersInThisListLoading,
  tagsInThisList,
  tagsInThisListLoading,
  onListJoin,
}) => (
  <div className="List">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border grow>
          <Flex horizontal="between">
            <H4>Bookmarks in {list?.name}</H4>
            <div id="List-joinList">
              <PlusCircle className="List-joinList" onClick={onListJoin} />
            </div>
            <Tooltip parentElementId={'List-joinList'} content="Join this list" />
          </Flex>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={bookmarksIds?.length} />
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
