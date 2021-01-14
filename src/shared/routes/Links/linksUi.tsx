import React from 'react';

import { LinkRow } from 'Components/LinkRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { LinkState } from 'Modules/Links/links.types';
import { lists } from 'Tools/mockData/mockLists';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Button, Flex, Hr } from '@antoniodcorrea/components';

import './Links.less';

interface Props {
  links: LinkState[];
}

export const LinksUi: React.FC<Props> = ({ links }) => (
  <div className="Links">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarListLists title="Popular Lists" items={lists} id="PopularLists" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={lists} id="PopularLists2" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={lists} id="PopularLists3" />
      </Sidebar>
      <Main>
        <MainHeader title="My links" />
        {links &&
          links.map((item, index) => (
            <React.Fragment key={item.id}>
              {!!index && <Hr spacer />}
              <LinkRow {...item} />
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
