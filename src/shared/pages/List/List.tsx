import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListAddUser from 'Components/ListAddUser';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState, ListUser } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import {
  AnimateHeight,
  Check,
  Cross,
  EditCircle,
  Eye,
  Hr,
  SortBy,
  Space,
  SpinnerCircularBrute,
  Tooltip,
} from 'Vendor/components';

import './List.less';

interface Props {
  showBanner: boolean;
  listInvitationRole: 'reader' | 'editor' | 'admin';
  sessionUserListRole: 'reader' | 'editor' | 'admin';
  list: ListState;
  listUserOwner: UserState;
  sessionUserOwnsList: boolean;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  usersInThisList: ListUser[];
  usersInThisListLoading: boolean;
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
  onInviteAccept: () => void;
  onInviteReject: () => void;
  acceptLoading: boolean;
  rejectLoading: boolean;
  onEditClick: () => void;
}

export const List: React.FC<Props> = ({
  listInvitationRole,
  sessionUserListRole,
  list,
  listUserOwner,
  sessionUserOwnsList,
  showBanner,
  bookmarksIds,
  bookmarksLoading,
  usersInThisList,
  usersInThisListLoading,
  tagsInThisList,
  tagsInThisListLoading,
  page,
  totalItems,
  url,
  sort,
  onInviteAccept,
  onInviteReject,
  acceptLoading,
  rejectLoading,
  onEditClick,
}) => (
  <>
    <div className="List">
      <div className="List-header List-headerTitle">
        <div className="List-headerTitleText">
          Bookmarks in
          <Space />
          <A href={`/lists/${list?.id}`} underlined frontend>
            {list?.name}
          </A>
        </div>
        <div className="List-headerImages">
          <>
            <Tooltip parentElementId="List-tooltipUserImage" content={`@${listUserOwner?.name}`} delay={0.5} />
            <A
              className="List-headerImagesItem List-headerImagesItemOwner"
              href={`/users/${listUserOwner?.id}`}
              styled={false}
              frontend
              key={listUserOwner?.id}
              id="List-tooltipUserImage"
            >
              <img
                className="List-headerImagesItemImage"
                src={listUserOwner?.image?.w200h200}
                alt={listUserOwner?.name}
              />
            </A>
          </>
          {usersInThisList?.map((item) => (
            <>
              <Tooltip parentElementId={`List-${item?.id}}`} content={`@${item?.name}`} delay={0.5} />
              <A
                className={
                  'List-headerImagesItem List-headerImagesItemJoined' +
                  (item?.userStatus === 'pending'
                    ? ' List-headerImagesItemJoined--pending'
                    : ' List-headerImagesItemJoined--active')
                }
                id={`List-${item?.id}}`}
                href={`/users/${item?.id}`}
                styled={false}
                key={item?.id}
                frontend
              >
                <img className="List-headerImagesItemImage" src={item.image?.w200h200} alt={item.name} />
              </A>
            </>
          ))}
          {sessionUserOwnsList && (
            <>
              <Tooltip parentElementId="List-tooltipAddUser" content="Add user" delay={0.5} />
              <div className="List-headerPlusIcon" id="List-tooltipAddUser">
                <ListAddUser listId={list?.id} />
              </div>
            </>
          )}
          {sessionUserListRole === 'reader' && (
            <>
              <Tooltip parentElementId="List-tooltipReader" content="Reader" delay={2} />
              <Eye className="List-iconRole List-iconReader" id="List-tooltipReader" />
            </>
          )}
          {sessionUserListRole === 'editor' && (
            <>
              <Tooltip parentElementId="List-tooltipEditor" content="Editor" delay={2} />
              <EditCircle className="List-iconRole List-iconEditor" id="List-tooltipEditor" />
            </>
          )}
          {sessionUserListRole === 'admin' && (
            <>
              <Tooltip parentElementId="List-tooltipAdmin" content="Admin" delay={2} />
              <EditCircle className="List-iconRole List-iconAdmin" id="List-tooltipAdmin" onClick={onEditClick} />
            </>
          )}
        </div>
      </div>
      <AnimateHeight className="List-notification" mounted={showBanner} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
        <div className="List-notificationText">You were invited to this list as {listInvitationRole}: join it?</div>
        {acceptLoading ? (
          <SpinnerCircularBrute className="List-notificationIcon" />
        ) : (
          <Check className="List-notificationIcon List-notificationIconCheck" onClick={onInviteAccept} />
        )}
        {rejectLoading ? (
          <SpinnerCircularBrute className="List-notificationIcon" />
        ) : (
          <Cross className="List-notificationIcon List-notificationIconCross" onClick={onInviteReject} />
        )}
      </AnimateHeight>
      <div className="List-header">
        <SortBy
          options={[
            { label: 'Rating', field: 'vote' },
            { label: 'Bookmarks', field: 'timesbookmarked' },
            { label: 'Date', field: 'updatedAt' },
          ]}
          href={url}
          currentSort={sort}
          loading={bookmarksLoading}
        />
      </div>

      <div className="List-bookmarks">
        {bookmarksLoading ? (
          <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          bookmarksIds?.map((id) => <BookmarkRow id={id} key={id} />)
        )}
        {!bookmarksLoading && !bookmarksIds?.length && (
          <div className="UserBookmarks-noResults">ⵁ We didnt find any bookmark.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="List-sidebarListTagsFirst"
        title="Tags In This List"
        loading={tagsInThisListLoading}
        tags={tagsInThisList}
      />

      <SidebarListUsers title="People in this list" users={usersInThisList} loading={usersInThisListLoading} />
    </Sidebar>
  </>
);
