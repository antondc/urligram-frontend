import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { PopularListsState } from 'Modules/Sections/sections.types';
import { tags } from 'Root/src/shared/tools/mockData/mockTags';
import { users } from 'Root/src/shared/tools/mockData/mockUsers';
import { Button, Flex, Hr } from '@antoniodcorrea/components';

import './Bookmarks.less';

interface Props {
  bookmarks: BookmarkState[];
  popularLists: PopularListsState[];
}

export const BookmarksUi: React.FC<Props> = ({ bookmarks, popularLists }) => (
  <div className="Bookmarks">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" />
        <Hr spacer />
      </Sidebar>
      <Main>
        <MainHeader title="My bookmarks" />
        {bookmarks &&
          bookmarks.map((item, index) => (
            <React.Fragment key={item.id}>
              {!!index && <Hr spacer />}
              <BookmarkRow {...item} />
            </React.Fragment>
          ))}
        <Hr spacer size="big" />
        <Flex horizontal="center">
          <Button text="Load more" />
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
