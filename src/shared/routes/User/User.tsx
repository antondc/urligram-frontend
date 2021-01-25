import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import { ListState } from 'Modules/Lists/lists.types';
import { Button, Fade, Flex, Hr } from '@antoniodcorrea/components';
import SidebarBlock from '../../components/SidebarBlock';
import { UserSkeleton } from './UserSkeleton';

import './User.less';

interface Props {
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: boolean;
  popularListLoading: boolean;
}

export const User: React.FC<Props> = ({ bookmarksIds, popularLists, loading, popularListLoading }) => (
  <div className="User">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="Popular lists" loading={popularListLoading}>
          <SidebarListLists items={popularLists} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
      <Main>
        <MainHeader title="My user" />
        {loading ? (
          <UserSkeleton />
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
        {/* <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" /> */}
        <Hr spacer />
      </Sidebar>
    </Flex>
  </div>
);
