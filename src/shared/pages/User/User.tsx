import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Empty from 'Components/Empty';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import UserForm from 'Components/UserForm';
import { UserState } from 'Modules/Users/users.types';
import { AIcon, Border, Flex, H4, Hr, Span, Tag } from 'Vendor/components';

import './User.less';

interface Props {
  userId: string;
  user: UserState;
  createdAtFormatted: string;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
  followersUsers: UserState[];
  followersUsersLoading: boolean;
}

export const User: React.FC<Props> = ({
  userId,
  user,
  createdAtFormatted,
  bookmarksIds,
  bookmarksLoading,
  followingUsers,
  followingUsersLoading,
  followersUsers,
  followersUsersLoading,
}) => (
  <div className="User">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border>
          <UserForm />
        </Border>
        <Hr spacer />
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
              <Span> {createdAtFormatted}</Span>
            </div>
            <img className="User-image" src={user?.image} />
          </Flex>
          <Hr spacer />
          <Flex>
            <Span className="User-detail" size="small">
              Bookmarks:{' '}
              <A href={`users/${userId}/bookmarks`} frontend>
                {user?.bookmarksIds?.length}
              </A>
            </Span>
            ·
            <Span className="User-detail" size="small">
              Following:{' '}
              <A href={`users/${userId}/following`} frontend>
                {user?.following?.length}
              </A>
            </Span>
            ·
            <Span className="User-detail" size="small">
              Followers:{' '}
              <A href={`users/${userId}/followers`} frontend>
                {user?.followers?.length}
              </A>
            </Span>
            ·
            <Span className="User-detail" size="small">
              Tags: {user?.tags?.length}
            </Span>
            ·
            <Span className="User-detail" size="small">
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
              <A
                className="User-tag"
                href={`/bookmarks?filter[tags][]=${item.name}`}
                key={item.id}
                styled={false}
                frontend
              >
                <Tag variant="simple" size="small">
                  {item.name}
                </Tag>
              </A>
            ))}
          </Flex>
        </Border>
        <Hr spacer />
        <Border grow>
          <Flex horizontal="between" vertical="bottom">
            <H4>User bookmarks</H4>
            <A href={`users/${userId}/bookmarks`} frontend>
              <AIcon size="small">See more</AIcon>
            </A>
          </Flex>
          <Hr spacer />
          {!!bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            bookmarksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer size="small" />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
          {!bookmarksLoading && !bookmarksIds?.length && <Empty message="ⵁ This user has no bookmarks yet" />}
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
