import React from 'react';

import { LinkRowSkeletonGroup } from 'Components/LinkRow/LinkRowSkeletonGroup';
import Main from 'Components/Main';
import MainHeader from 'Components/MainHeader';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import LinkRow from 'Root/src/shared/components/LinkRow';
import { Border, Button, Flex, Hr } from '@antoniodcorrea/components';

import './Links.less';

interface Props {
  linksIds: number[];
  loading: boolean;
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
  newLists: ListState[];
  newListsLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
}

export const Links: React.FC<Props> = ({
  linksIds,
  mostFollowedLists,
  mostFollowedListsLoading,
  loading,
  newLists,
  newListsLoading,
  newUsers,
  newUsersLoading,
  mostUsedTags,
  mostUsedTagsLoading,
}) => (
  <div className="Links">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock
          title="Most Followed Lists"
          href="lists?sort=-members&page[size]=10"
          loading={mostFollowedListsLoading}
        >
          <SidebarListLists items={mostFollowedLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Lists" href="lists?sort=-createdat&page[size]=10" loading={newListsLoading}>
          <SidebarListLists items={newLists} />
        </SidebarBlock>
        <Hr spacer />
      </Sidebar>
      <Main>
        <Border grow>
          <MainHeader title="My links" />
          {loading ? (
            <LinkRowSkeletonGroup />
          ) : (
            linksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <LinkRow id={id} />
              </React.Fragment>
            ))
          )}
          <Hr spacer size="big" />
          <Flex horizontal="center">
            <Button text="Load more" />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Popular Tags" href="tags?sort[most-used]=desc" loading={mostUsedTagsLoading}>
          <SidebarListTags items={mostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdat&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
