import React from 'react';

import LinkRow from 'Components/LinkRow';
import { LinkRowSkeletonGroup } from 'Components/LinkRow/LinkRowSkeletonGroup';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr } from '@antoniodcorrea/components';

import './Links.less';

interface Props {
  linksIds: number[];
  loading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
}

export const Links: React.FC<Props> = ({
  linksIds,
  loading,
  newUsers,
  newUsersLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  url,
  page,
  totalItems,
}) => (
  <div className="Links">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border grow>
          <H4>Links</H4>
          <Hr spacer />
          {loading ? (
            <LinkRowSkeletonGroup length={linksIds?.length} />
          ) : (
            linksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <LinkRow id={id} />
              </React.Fragment>
            ))
          )}
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
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
