import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { AIcon, Border, Flex, H4, Hr, Tag } from '@antoniodcorrea/components';

import './Home.less';

export interface Props {
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  allTags: TagState[];
  allTagsLoading: boolean;
  bookmarksCurrentIds: number[];
  bookmarksLoading: boolean;
}

export const Home: React.FC<Props> = ({
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  allTags,
  allTagsLoading,
  bookmarksCurrentIds,
  bookmarksLoading,
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
                href={`/links?filter[tags]=${item.name}`}
                key={`SidebarListTags-tags-${item.id}`}
                styled={false}
                frontend
              >
                <Tag size="big">{item.name}</Tag>
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
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup />
          ) : (
            bookmarksCurrentIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
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
