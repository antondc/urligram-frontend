import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import { ListState } from 'Modules/Lists/lists.types';
import { BookmarkRowSkeletonGroup } from 'Root/src/shared/components/BookmarkRow/BookmarkRowSkeletonGroup';
import { Border, Button, Fade, Flex, Hr } from '@antoniodcorrea/components';

import './Bookmarks.less';

interface Props {
  url: string;
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: boolean;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
}

export const Bookmarks: React.FC<Props> = ({ url, bookmarksIds, popularLists, loading, page, totalItems }) => (
  <div className="Bookmarks">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border grow>
          <MainHeader title="My bookmarks" />
          {loading ? (
            <BookmarkRowSkeletonGroup length={5} />
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
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
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
