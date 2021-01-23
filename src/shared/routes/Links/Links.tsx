import React from 'react';

import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import LinkRow from 'Root/src/shared/components/LinkRow';
import { tags } from 'Tools/mockData/mockTags';
import { users } from 'Tools/mockData/mockUsers';
import { Button, FadeInOut, Flex, Hr } from '@antoniodcorrea/components';
import { LinksSkeleton } from './LinksSkeleton';

import './Links.less';

interface Props {
  linksIds: number[];
  popularLists: ListState[];
  loading: boolean;
}

export const Links: React.FC<Props> = ({ linksIds, popularLists, loading }) => (
  <div className="Links">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists2" />
        <Hr spacer />
        <SidebarListLists title="Popular Lists" items={popularLists} id="PopularLists3" />
      </Sidebar>
      <Main>
        <MainHeader title="My links" />
        <FadeInOut valueToUpdate={loading} speed="fastest">
          {loading ? (
            <LinksSkeleton />
          ) : (
            linksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <LinkRow id={id} />
              </React.Fragment>
            ))
          )}
        </FadeInOut>

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
