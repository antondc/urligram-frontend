import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListLists from 'Components/SidebarListLists';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Fade, Flex, H4, Hr, Span, Tag } from '@antoniodcorrea/components';

import './UserUser.less';

interface Props {
  userId: string;
  user: UserState;
  createdAt: string;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  userLists: ListState[];
  userListsLoading: boolean;
  followingLists: ListState[];
  followingListsLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
  followersUsers: UserState[];
  followersUsersLoading: boolean;
}

export const UserUser: React.FC<Props> = ({
  userId,
  user,
  createdAt,
  bookmarksIds,
  bookmarksLoading,
  userLists,
  userListsLoading,
  followingLists,
  followingListsLoading,
  followingUsers,
  followingUsersLoading,
  followersUsers,
  followersUsersLoading,
}) => (
  <div className="UserUser">
    <Flex horizontal="between" vertical="top">
      <Sidebar>
        <SidebarBlock title="User lists" href="" loading={userListsLoading}>
          <SidebarListLists items={userLists} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Lists followed" href="" loading={followingListsLoading}>
          <SidebarListLists items={followingLists} />
        </SidebarBlock>
      </Sidebar>
      <Main>
        <Border grow>
          <Flex horizontal="between">
            <div>
              <Span bold>Name:</Span>
              <Span> @{user?.name}</Span>
              <Hr spacer size="zero" />
              <Hr spacer size="micro" />
              <Span bold>Location:</Span>
              <Span> {user?.location}</Span>
              <Hr spacer size="zero" />
              <Hr spacer size="micro" />
              <Span bold>Statement:</Span>
              <Span> {user?.statement}</Span>
              <Hr spacer size="zero" />
              <Hr spacer size="micro" />
              <Span bold>Created at:</Span>
              <Span> {createdAt}</Span>
            </div>
            <img className="UserUser-image" src={user?.image} />
          </Flex>
          <Hr spacer />
          <Flex>
            <Span className="UserUser-detail" size="small">
              Bookmarks:{' '}
              <A href={`users/${userId}/bookmarks`} frontend>
                {user?.bookmarksIds?.length}
              </A>
            </Span>
            ·
            <Span className="UserUser-detail" size="small">
              Following:{' '}
              <A href={`users/${userId}/following`} frontend>
                {user?.following?.length}
              </A>
            </Span>
            ·
            <Span className="UserUser-detail" size="small">
              Followers:{' '}
              <A href={`users/${userId}/followers`} frontend>
                {user?.followers?.length}
              </A>
            </Span>
            ·
            <Span className="UserUser-detail" size="small">
              Tags: {user?.tags?.length}
            </Span>
            ·
            <Span className="UserUser-detail" size="small">
              Lists:{' '}
              <A href={`users/${userId}/lists`} frontend>
                {user?.lists?.length}
              </A>
            </Span>
          </Flex>
          <Hr spacer />
          <Hr size="nano" />
          <Hr spacer />
          <Span bold>Tags:</Span>
          <Hr spacer size="small" />
          <Flex>
            {user?.tags?.map((item) => (
              <A className="UserUser-tag" href={`tags/${item.name}`} key={item.id} styled={false} frontend>
                <Tag size="small">{item.name}</Tag>
              </A>
            ))}
          </Flex>
        </Border>
        <Hr spacer />
        <Border grow>
          <H4>User bookmarks</H4>
          <Hr spacer />
          {!!bookmarksLoading ? (
            <BookmarkRowSkeletonGroup />
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
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Following Users" href={`users/${userId}/following`} loading={followingUsersLoading}>
          <SidebarListUsers items={followingUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Followers" href={`users/${userId}/followers`} loading={followersUsersLoading}>
          <SidebarListUsers items={followersUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
