import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import { ListState } from 'Modules/Lists/lists.types';
import { BookmarkRowSkeletonGroup } from 'Root/src/shared/components/BookmarkRow/BookmarkRowSkeletonGroup';
import { Border, Button, Flex, H4, Hr } from '@antoniodcorrea/components';
import SidebarBlock from '../../components/SidebarBlock';

import './ListVisitor.less';

interface Props {
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
}

export const ListVisitor: React.FC<Props> = ({
  list,
  bookmarksIds,
  bookmarksLoading,
  mostFollowedLists,
  mostFollowedListsLoading,
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
        <Hr spacer />
      </Sidebar>
    </Flex>
  </div>
);
