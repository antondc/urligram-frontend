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
import { AIcon, Flex, Frame, Hr, Space, Span, Tag } from 'Vendor/components';

import './User.less';

interface Props {
  userIdIsSessionId: boolean;
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
  userIdIsSessionId,
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
        <Hr spacer size="nano" />
        <Hr spacer />
        {userIdIsSessionId && (
          <Frame grow borderBottom={false}>
            <UserForm />
          </Frame>
        )}
        <Frame grow>
          <Flex horizontal="between">
            <div>
              <Flex vertical="bottom" growVertical={false} noWrap>
                <Span weight="semiBold">Name:</Span> <Space />
                <Span weight="semiBold" size="small">
                  @{user?.name}
                </Span>
              </Flex>
              <Hr spacer size="zero" />
              <Hr spacer size="micro" />
              <Flex vertical="bottom" growVertical={false} noWrap>
                <Span weight="semiBold">Location:</Span> <Space />
                <Span weight="semiBold" size="small">
                  {user?.location}
                </Span>
              </Flex>
              <Hr spacer size="zero" />
              <Hr spacer size="micro" />
              <Flex vertical="bottom" growVertical={false} noWrap>
                <Span weight="semiBold">Statement:</Span> <Space />
                <Span weight="semiBold" size="small">
                  {user?.statement}
                </Span>
              </Flex>
              <Hr spacer size="zero" />
              <Hr spacer size="micro" />
              <Flex vertical="bottom" growVertical={false} noWrap>
                <Span weight="semiBold">Created at:</Span> <Space />
                <Span weight="semiBold" size="small">
                  {createdAtFormatted}
                </Span>
              </Flex>
            </div>
            <img className="User-image" src={user?.image?.original} />
          </Flex>
          <Hr spacer />
          <Flex>
            <A href={`users/${userId}/bookmarks`} frontend underlined>
              <Span size="small" weight="semiBold">
                Bookmarks:
              </Span>
            </A>
            <Span size="small" weight="semiBold">
              <Space />
              {user?.bookmarksIds?.length}
            </Span>
            <Space />
            <Space />·<Space />
            <A href={`users/${userId}/following`} frontend underlined>
              <Span size="small" weight="semiBold">
                Following:
              </Span>
            </A>
            <Span size="small" weight="semiBold">
              <Space />
              {user?.following?.length}
            </Span>
            <Space />
            <Space />·<Space />
            <A href={`users/${userId}/followers`} frontend underlined>
              <Span size="small" weight="semiBold">
                Followers:
              </Span>
              <Span size="small" weight="semiBold">
                <Space />
                {user?.followers?.length}
              </Span>
            </A>
            <Space />
            <Space />·<Space />
            <A href={`users/${userId}/followers`} frontend underlined>
              <Span size="small" weight="semiBold">
                Tags:
              </Span>
            </A>
            <Span size="small" weight="semiBold">
              <Space />
              {user?.tags?.length}
            </Span>
            <Space />
            <Space />·<Space />
            <A href={`users/${userId}/lists`} frontend underlined>
              <Span size="small" weight="semiBold">
                Lists:
              </Span>
            </A>
            <Span size="small" weight="semiBold">
              <Space />
              {user?.lists?.length}
            </Span>
          </Flex>
          <Hr spacer />
          <Span weight="semiBold">Tags:</Span>
          <Hr spacer size="small" />
          <Flex>
            {user?.tags?.map((item) => (
              <A
                className="User-tag"
                href={`/bookmarks?filter[tags][]=${item.name}`}
                key={item.id}
                styled={false}
                frontend
                underlined
              >
                <Tag variant="simple" size="small">
                  {item.name}
                </Tag>
              </A>
            ))}
          </Flex>
        </Frame>
        <Frame grow padding="small" borderTop={false}>
          <Flex horizontal="between" vertical="bottom">
            <Span size="normal" weight="semiBold">
              User bookmarks
            </Span>
            <A href={`users/${userId}/bookmarks`} frontend underlined>
              <AIcon size="small">See more</AIcon>
            </A>
          </Flex>
        </Frame>
        <Frame grow padding="small" borderTop={false}>
          {!!bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={5} />
          ) : (
            bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
          )}
          {!bookmarksLoading && !bookmarksIds?.length && <Empty message="ⵁ This user has no bookmarks yet" />}
        </Frame>
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
