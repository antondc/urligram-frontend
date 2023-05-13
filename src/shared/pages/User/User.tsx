import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import NoResults from 'Components/NoResults';
import UserForm from 'Components/UserForm';
import UserImageWithFollow from 'Components/UserImageWithFollow';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { UserAccountType, UserState } from 'Modules/Users/users.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button, Space, Tag } from '@antoniodcorrea/components';

import './User.less';

interface Props {
  isLoggedIn: boolean;
  glossary: GlossaryState;
  userIdIsSessionId: boolean;
  userId: string;
  user: UserState;
  userPublicBookmarks: number;
  listsIds: number[];
  listsLoading: boolean;
  createdAtFormatted: string;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  onUserDelete: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const User: React.FC<Props> = ({
  isLoggedIn,
  glossary,
  userIdIsSessionId,
  userId,
  user,
  userPublicBookmarks,
  listsIds,
  listsLoading,
  createdAtFormatted,
  bookmarksIds,
  bookmarksLoading,
  onUserDelete,
}) => (
  <div className="User">
    <Helmet title={`${SITE_TITLE} · @${user?.name}`} />
    {userIdIsSessionId && (
      <CardItem className="User-sectionUserForm">
        <UserForm />
      </CardItem>
    )}
    <CardItem className="User-top">
      <div className="User-details">
        <div>
          <div className="User-detailsItem">{glossary.name}:</div>
          <div className="User-detailsItemData">{user?.name}</div>
          <div className="User-detailsItem">{glossary.accountTypeTitle}:</div>
          <div className="User-detailsItemData">
            {user?.accountType === UserAccountType.Advanced ? glossary.accountTypeAdvanced : glossary.accountTypeBasic}
          </div>
          <div className="User-detailsItem">{glossary.created}:</div>
          <div className="User-detailsItemData">{createdAtFormatted}</div>
        </div>
        <UserImageWithFollow
          className="User-image"
          userId={user?.id}
          userName={user?.name}
          image={user?.image?.original}
        />
      </div>
      <div className="User-lineDetails">
        <A className="User-lineDetailsLink" href={`users/${userId}/bookmarks`} frontend underlined styled={false}>
          {glossary.totalBookmarks}:
          <Space />
          {user?.bookmarksIds?.length}
        </A>
        <Space />
        <Space />
        <Space />·<Space />
        <Space />
        <Space />
        {userIdIsSessionId && (
          <>
            {glossary.privateBookmarks}:
            <Space />
            {user?.bookmarksPrivate}
            <Space />
            <Space />
            <Space />·<Space />
            <Space />
            <Space />
            {glossary.publicBookmarks}:
            <Space />
            {userPublicBookmarks}
            <Space />
            <Space />
            <Space />·<Space />
            <Space />
            <Space />
          </>
        )}
        <A className="User-lineDetailsLink" href={`users/${userId}/following`} frontend underlined styled={false}>
          {glossary.following}:
          <Space />
          {user?.following?.length}
        </A>
        <Space />
        <Space />
        <Space />·<Space />
        <Space />
        <Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/followers`} frontend underlined styled={false}>
          {glossary.followers}:
          <Space />
          {user?.followers?.length}
          <Space />
        </A>
        <Space />
        <Space />·<Space />
        <Space />
        <Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/followers`} frontend underlined styled={false}>
          {glossary.tags}:
          <Space />
          {user?.tags?.length}
        </A>
        <Space />
        <Space />
        <Space />·<Space />
        <Space />
        <Space />
        <A className="User-lineDetailsLink" href={`users/${userId}/lists`} frontend underlined styled={false}>
          {glossary.lists}:
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
      {glossary.bookmarks}
      <A className="User-subHeaderLink" href={`users/${userId}/bookmarks`} frontend underlined styled={false}>
        {glossary.seeMore}
      </A>
    </CardItem>
    <div className="User-bookmarks">
      {!!bookmarksLoading ? (
        <BookmarkRowSkeletonGroup length={5} />
      ) : (
        bookmarksIds?.map((id) => (
          <CardItem key={id}>
            <BookmarkRow id={id} tagsHref={`/users/${userId}/bookmarks`} withInfoButton={isLoggedIn} />
          </CardItem>
        ))
      )}
      {!bookmarksLoading && !bookmarksIds?.length && <NoResults content={`ⵁ ${glossary.thisUserHasNoBookmarksYet}.`} />}
    </div>
    <CardItem className="User-listsHeader">
      {glossary.lists}
      <A className="User-subHeaderLink" href={`users/${userId}/lists`} frontend underlined styled={false}>
        {glossary.seeMore}
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
      {!listsLoading && !listsIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyList}.`} />}
    </div>
    {userIdIsSessionId && (
      <CardItem className="User-sectionUserDelete">
        <div className="User-sectionUserDeleteLeft">
          <div className="User-sectionUserDeleteTitle">{glossary.deleteUser}</div>
          <div className="User-sectionUserDeleteDescription">{glossary.thisActionCanNotBeUndone}.</div>
        </div>
        <div className="User-sectionUserDeleteRight">
          <Button className="User-sectionUserDeleteButton" text={glossary.delete} onClick={onUserDelete} />
        </div>
      </CardItem>
    )}
  </div>
);
