import React from 'react';

import LinkCard from 'Components/LinkCard';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { lists } from 'Root/src/shared/tools/mockData/mockLists';
import { tags } from 'Root/src/shared/tools/mockData/mockTags';
import { users } from 'Root/src/shared/tools/mockData/mockUsers';
import { Button, Flex, Hr } from '@antoniodcorrea/components';
import { BookmarkState } from '../../redux/modules/Bookmarks/bookmarks.types';

import './Home.less';

interface Props {
  bookmarks: BookmarkState[];
}

export const HomeUI: React.FC<Props> = ({ bookmarks }) => (
  <div className="Home">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarListLists title="Popular Lists" items={lists} />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={lists} />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={lists} />
      </Sidebar>
      <Main>
        <MainHeader title="My bookmarks" />
        {bookmarks &&
          bookmarks.map((item, index) => (
            <React.Fragment key={item.id}>
              {!!index && <Hr spacer />}
              <LinkCard {...item} />
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
