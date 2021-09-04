import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import Main from 'Components/Main';
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
  <Main className="User">
    <Helmet title={`${SITE_TITLE} · User`} />
    {userIdIsSessionId && (
      <div className="User-form">
        <UserForm />{' '}
      </div>
    )}
    <div className="User-top">
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
        <A href={`users/${userId}/bookmarks`} frontend underlined>
          Bookmarks:
        </A>
        <Space />
        {user?.bookmarksIds?.length}
        <Space />
        <Space />·<Space />
        <A href={`users/${userId}/following`} frontend underlined>
          Following:
        </A>
        <Space />
        {user?.following?.length}
        <Space />
        <Space />·<Space />
        <A href={`users/${userId}/followers`} frontend underlined>
          Followers:
          <Space />
        </A>
        {user?.followers?.length}
        <Space />
        <Space />·<Space />
        <A href={`users/${userId}/followers`} frontend underlined>
          Tags:
        </A>
        <Space />
        {user?.tags?.length}
        <Space />
        <Space />·<Space />
        <A href={`users/${userId}/lists`} frontend underlined>
          Lists:
        </A>
        <Space />
        {user?.lists?.length}
      </div>
      <Hr spacer />
      Tags:
      <Hr spacer size="small" />
      <div className="User-tags">
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
      </div>
    </div>
    <div className="User-bookmarksHeader">
      Bookmarks
      <A href={`users/${userId}/bookmarks`} frontend underlined>
        <AIcon size="small">See more</AIcon>
      </A>
    </div>
    <div className="User-bookmarks">
      {!!bookmarksLoading ? (
        <BookmarkRowSkeletonGroup length={5} />
      ) : (
        bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
      )}
      {!bookmarksLoading && !bookmarksIds?.length && <NoResults content="ⵁ This user has no bookmarks yet" />}
    </div>
    <div className="User-listsHeader">
      Lists
      <A href={`users/${userId}/lists`} frontend underlined>
        <AIcon size="small">See more</AIcon>
      </A>
    </div>
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
  </Main>
);
