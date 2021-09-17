import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import NoResults from 'Components/NoResults';
import UserForm from 'Components/UserForm';
import { UserState } from 'Modules/Users/users.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Space, Tag } from '@antoniodcorrea/components';

import './User.less';

interface Props {
  userIdIsSessionId: boolean;
  userId: string;
  user: UserState;
  listsIds: number[];
  listsLoading: boolean;
  createdAtFormatted: string;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
}

export const User: React.FC<Props> = ({
  userIdIsSessionId,
  userId,
  user,
  listsIds,
  listsLoading,
  createdAtFormatted,
  bookmarksIds,
  bookmarksLoading,
}) => (
  <div className="User">
    <Helmet title={`${SITE_TITLE} · User`} />
    {userIdIsSessionId && (
      <CardItem className="User-form">
        <UserForm />
      </CardItem>
    )}
    <CardItem className="User-top">
      <div className="User-details">
        <div>
          <div className="User-detailsItem">Name:</div>
          <div className="User-detailsItemData">{user?.name}</div>
          <div className="User-detailsItem">Location:</div>
          <div className="User-detailsItemData">{user?.location}</div>
          <div className="User-detailsItem">Statement:</div>
          <div className="User-detailsItemData">{user?.statement}</div>
          <div className="User-detailsItem">Created at:</div>
          <div className="User-detailsItemData">{createdAtFormatted}</div>
        </div>
        <img className="User-image" src={user?.image?.original} />
      </div>
      <div className="User-lineDetails">
        <A className="User-lineDetailsLink" href={`users/${userId}/bookmarks`} frontend underlined styled={false}>
          Bookmarks:
          <Space />
          {user?.bookmarksIds?.length}
        </A>
        <Space />
        <Space />·<Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/following`} frontend underlined styled={false}>
          Following:
          <Space />
          {user?.following?.length}
        </A>
        <Space />
        <Space />·<Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/followers`} frontend underlined styled={false}>
          Followers:
          <Space />
          {user?.followers?.length}
          <Space />
        </A>
        <Space />·<Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/followers`} frontend underlined styled={false}>
          Tags:
          <Space />
          {user?.tags?.length}
        </A>
        <Space />
        <Space />·<Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/lists`} frontend underlined styled={false}>
          Lists:
          <Space />
          {user?.lists?.length}
        </A>
      </div>
      <div className="User-tags">
        {user?.tags?.map((item) => (
          <A
            className="User-tag"
            href={`users/${userId}/bookmarks?filter[tags][]=${item.name}`}
            key={item.id}
            styled={false}
            frontend
            underlined
          >
            <Tag>{item.name}</Tag>
          </A>
        ))}
      </div>
    </CardItem>
    <CardItem className="User-bookmarksHeader">
      Bookmarks
      <A className="User-subHeaderLink" href={`users/${userId}/bookmarks`} frontend underlined styled={false}>
        See more
      </A>
    </CardItem>
    <div className="User-bookmarks">
      {!!bookmarksLoading ? (
        <BookmarkRowSkeletonGroup length={5} />
      ) : (
        bookmarksIds?.map((id) => (
          <CardItem key={id}>
            <BookmarkRow id={id} tagHrefPath={`/users/${userId}/bookmarks`} />
          </CardItem>
        ))
      )}
      {!bookmarksLoading && !bookmarksIds?.length && <NoResults content="ⵁ This user has no bookmarks yet" />}
    </div>
    <CardItem className="User-listsHeader">
      Lists
      <A className="User-subHeaderLink" href={`users/${userId}/lists`} frontend underlined styled={false}>
        See more
      </A>
    </CardItem>
    <div className="User-lists">
      {listsLoading ? (
        <BookmarkRowSkeletonGroup length={5} />
      ) : (
        listsIds?.slice(0, 5)?.map((id) => (
          <CardItem key={id}>
            <ListRow id={id} />
          </CardItem>
        ))
      )}
      {!listsLoading && !listsIds?.length && <NoResults content="ⵁ We didn find any list." />}
    </div>
  </div>
);
