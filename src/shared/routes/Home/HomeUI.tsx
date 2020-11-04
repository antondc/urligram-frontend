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
import Button from 'Ui/Button';
import Flex from 'Ui/Flex';
import Hr from 'Ui/Hr';
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
        <Hr type="spacer" />
        <SidebarListLists title="Popular Lists" items={lists} />
        <Hr type="spacer" />
        <SidebarListLists title="Popular Lists" items={lists} />
      </Sidebar>
      <Main>
        <MainHeader title="My bookmarks" />
        {bookmarks &&
          bookmarks.map((item, index) => (
            <React.Fragment key={item.id}>
              {!!index && <Hr type="spacer" />}
              <LinkCard {...item} />
            </React.Fragment>
          ))}
        <Hr type="spacer" size="big" />
        <Flex horizontal="center">
          <Button text="Load more" />
        </Flex>
      </Main>
      <Sidebar>
        <SidebarListTags title="Trending Tags" items={tags} />
        <Hr type="spacer" />
        <SidebarListUsers title="Popular Users" items={users} />
        <Hr type="spacer" />
        <SidebarListUsers title="Following" items={users} />
        <Hr type="spacer" />
        <SidebarListUsers title="Followers" items={users} />
      </Sidebar>
    </Flex>
  </div>
);
