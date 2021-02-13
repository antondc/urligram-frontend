import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import { ListState } from 'Modules/Lists/lists.types';
import { BookmarkRowSkeletonGroup } from 'Root/src/shared/components/BookmarkRow/BookmarkRowSkeletonGroup';
import { Border, Button, Fade, Flex, Hr } from '@antoniodcorrea/components';

import './Bookmarks.less';

interface Props {
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: boolean;
}

export const Bookmarks: React.FC<Props> = ({ bookmarksIds, popularLists, loading }) => (
  <div className="Bookmarks">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border grow>
          <MainHeader title="My bookmarks" />
          {loading ? (
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
        {/* <SidebarListTags title="Trending Tags" items={tags} />
        <Hr spacer />
        <SidebarListUsers title="Popular Users" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Following" items={users} />
        <Hr spacer />
        <SidebarListUsers title="Followers" items={users} /> */}
      </Sidebar>
    </Flex>
  </div>
);
