import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { BookmarksRowSkeletonGroup } from 'Root/src/shared/components/BookmarkRow/BookmarksRowSkeletonGroup';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Button, Fade, Flex, Hr } from '@antoniodcorrea/components';

import './BookmarksVisitor.less';

interface Props {
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: boolean;
}

export const BookmarksVisitor: React.FC<Props> = ({ bookmarksIds, popularLists, loading }) => (
  <div className="BookmarksVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        {/* <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" /> */}
        <Hr spacer />
      </Sidebar>
      <Main>
        <MainHeader title="My bookmarks" />
        {loading ? (
          <BookmarksRowSkeletonGroup />
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
      </Main>
      <Sidebar>
        <SidebarListTags title="Trending Tags" items={tags} />
        <Hr spacer />
        <SidebarListUsers title="Popular Users" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Following" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Followers" items={users} />
      </Sidebar>
    </Flex>
  </div>
);
