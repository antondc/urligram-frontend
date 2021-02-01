import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Button, Fade, Flex, Hr } from '@antoniodcorrea/components';

import './UserUser.less';

interface Props {
  bookmarksIds: number[];
  popularLists: ListState[];
  bookmarksLoading: boolean;
  popularListLoading: boolean;
}

export const UserUser: React.FC<Props> = ({ bookmarksIds, popularLists, bookmarksLoading, popularListLoading }) => (
  <div className="UserUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Popular lists" href="" loading={popularListLoading}>
          <SidebarListLists items={popularLists} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
      <Main>
        <Border grow>
          <MainHeader title="My user" />
          {!!bookmarksLoading ? (
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
            <Fade mounted={!!bookmarksIds?.length} speed="fastest">
              <Button text="Load more" />
            </Fade>
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        {/* <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" /> */}
        <Hr spacer />
      </Sidebar>
    </Flex>
  </div>
);
