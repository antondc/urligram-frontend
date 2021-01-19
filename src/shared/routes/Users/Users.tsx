import React from 'react';

import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import UserRow from 'Components/UserRow';
import { ListState } from 'Modules/Lists/lists.types';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Button, Fade, Flex, Hr } from '@antoniodcorrea/components';

import './Users.less';

interface Props {
  usersIds: string[];
  popularLists: ListState[];
}

export const Users: React.FC<Props> = ({ usersIds, popularLists }) => (
  <div className="Users">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" />
        <Hr spacer />
      </Sidebar>
      <Main>
        <MainHeader title="My users" />
        {usersIds &&
          usersIds.map((id, index) => (
            <React.Fragment key={id}>
              {!!index && <Hr spacer />}
              <UserRow id={id} />
            </React.Fragment>
          ))}
        <Hr spacer size="big" />
        <Flex horizontal="center">
          <Fade mounted={!!usersIds?.length} speed="fastest">
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
