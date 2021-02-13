import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr } from '@antoniodcorrea/components';

import './HomeUser.less';

interface Props {
  user: UserState;
  bookmarksLoading: boolean;
  sessionId: string;
  myTags: TagState[];
  myTagsLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
}

export const HomeUser: React.FC<Props> = ({
  user,
  bookmarksLoading,
  sessionId,
  myTags,
  myTagsLoading,
  followingUsers,
  followingUsersLoading,
}) => (
  <div className="HomeUser">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border className="HomeUser-main">
          <A href={`users/${sessionId}/bookmarks?sort=-members&page[size]=10`} frontend>
            <H4>My Bookmarks</H4>
          </A>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            user?.bookmarksIds?.map(
              (id, index) =>
                index < 5 && (
                  <React.Fragment key={id}>
                    {!!index && <Hr spacer />}
                    <BookmarkRow id={id} />
                  </React.Fragment>
                )
            )
          )}
        </Border>
        <Hr spacer />
        <Border className="HomeUser-main">
          <A href={`users/${sessionId}/recommended`} frontend>
            <H4>Recommended Bookmarks</H4>
          </A>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            user?.bookmarksIds?.map(
              (id, index) =>
                index < 5 && (
                  <React.Fragment key={id}>
                    {!!index && <Hr spacer />}
                    <BookmarkRow id={id} />
                  </React.Fragment>
                )
            )
          )}
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="My Tags" href={`users/${sessionId}/tags`} loading={myTagsLoading}>
          <SidebarListTags items={myTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Following Users" href={`users/${sessionId}/following`} loading={followingUsersLoading}>
          <SidebarListUsers items={followingUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
