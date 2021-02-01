import React from 'react';

import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { ListState } from 'Modules/Lists/lists.types';
import { Button, Fade, Flex, Hr } from '@antoniodcorrea/components';

import './UsersVisitor.less';

interface Props {
  usersIds: string[];
  popularLists: ListState[];
  popularListLoading: boolean;
  usersLoading: boolean;
}

export const UsersVisitor: React.FC<Props> = ({ usersIds, popularLists, usersLoading, popularListLoading }) => (
  <div className="UsersVisitor">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Popular lists" href="lists?sort=-members&page[size]=10" loading={popularListLoading}>
          <SidebarListLists items={popularLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <MainHeader title="My users" />
        {usersLoading ? (
          <UserRowSkeletonGroup />
        ) : (
          usersIds?.map((id, index) => (
            <React.Fragment key={id}>
              {!!index && <Hr spacer />}
              <UserRow id={id} />
            </React.Fragment>
          ))
        )}
        <Hr spacer size="big" />
        <Flex horizontal="center">
          <Fade mounted={!!usersIds?.length} speed="fastest">
            <Button text="Load more" />
          </Fade>
        </Flex>
      </Main>
      <Sidebar>{/*  */}</Sidebar>
    </Flex>
  </div>
);
