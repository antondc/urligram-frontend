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
import { AIcon, Hr, Space, Tag } from 'Vendor/components';

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
          <div className="User-detailsItem">
            Name: <Space />
            <span className="User-detailsItemData">@{user?.name}</span>
          </div>
          <Hr spacer size="zero" />
          <Hr spacer size="micro" />
          <div className="User-detailsItem">
            Location: <Space />
            <span className="User-detailsItemData">{user?.location}</span>
          </div>
          <Hr spacer size="zero" />
          <Hr spacer size="micro" />
          <div className="User-detailsItem">
            Statement: <Space />
            <span className="User-detailsItemData">{user?.statement}</span>
          </div>
          <Hr spacer size="zero" />
          <Hr spacer size="micro" />
          <div className="User-detailsItem">
            Created at: <Space />
            <span className="User-detailsItemData">{createdAtFormatted}</span>
          </div>
        </div>
        <img className="User-image" src={user?.image?.original} />
      </div>
      <Hr spacer />
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
      <Hr spacer />
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
      <A href={`users/${userId}/bookmarks`} frontend underlined styled={false}>
        <AIcon size="small">See more</AIcon>
      </A>
    </CardItem>
    <CardItem className="User-bookmarks">
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
    </CardItem>
    <CardItem className="User-listsHeader">
      Lists
      <A className="User-subHeaderLink" href={`users/${userId}/lists`} frontend underlined styled={false}>
        <AIcon size="small">See more</AIcon>
      </A>
    </CardItem>
    <CardItem className="User-lists">
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
    </CardItem>
  </div>
);
