import React from 'react';

import A from 'Components/A';
import LinkRow from 'Components/LinkRow';
import { LinkRowSkeletonGroup } from 'Components/LinkRow/LinkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { AIcon, Border, FadeInOut, Flex, H4, Hr, Tag } from '@antoniodcorrea/components';

import './Home.less';

export interface Props {
  linksIds: number[];
  linksIdsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  allTags: TagState[];
  allTagsLoading: boolean;
}

export const Home: React.FC<Props> = ({
  linksIds,
  linksIdsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  allTags,
  allTagsLoading,
}) => (
  <div className="Home">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border className="Home-tags" grow>
          <H4>Trending Tags</H4>
          <Hr spacer />
          {allTagsLoading ? (
            <div>...loading</div>
          ) : (
            allTags?.map((item) => (
              <A
                className="SidebarListTags-tag"
                href={`/links?filter[tags][]=${item.name}`}
                key={`SidebarListTags-tags-${item.id}`}
                styled={false}
                frontend
              >
                <Tag size="medium">{item.name}</Tag>
              </A>
            ))
          )}
        </Border>
        <Hr spacer />
        <Border className="Home-tags" grow>
          <Flex horizontal="between" vertical="bottom">
            <H4>Links</H4>
            <A href={'links'} frontend>
              <AIcon size="small">See more</AIcon>
            </A>
          </Flex>
          <Hr spacer size="small" />{' '}
          <FadeInOut valueToUpdate={linksIdsLoading} speed="fastest">
            {linksIdsLoading ? (
              <LinkRowSkeletonGroup length={5} />
            ) : (
              linksIds?.map((id, index) => (
                <React.Fragment key={id}>
                  {!!index && <Hr spacer size="small" />}
                  <LinkRow id={id} />
                </React.Fragment>
              ))
            )}
          </FadeInOut>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock
          title="Most Followed Users"
          href="users?sort=-followers&page[size]=10"
          loading={mostFollowedUsersLoading}
        >
          <SidebarListUsers items={mostFollowedUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdat&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
