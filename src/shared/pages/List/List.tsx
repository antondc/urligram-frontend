import React, { memo } from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkFilled.svg';
import Rating from 'Assets/svg/rating.svg';
import Clock from 'Assets/svg/spinner6.svg';
import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListAddUser from 'Components/ListAddUser';
import Pagination from 'Components/Pagination';
import { RenderInPortal } from 'Components/Portal';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState, ListUser } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import {
  AnimateHeight,
  Check,
  Cross,
  EditCircle,
  Eye,
  Hr,
  Select,
  SelectValue,
  SortBy,
  Space,
  SpinnerPie,
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
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
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
  allTags,
  currentQueryParamFilterTags,
  tagsSearchFormatted,
  onInputChange,
  onChange,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · ${list?.name}`} />
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
          <React.Fragment>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipUserImage" content={`@${listUserOwner?.name}`} delay={0.5} />
            </RenderInPortal>
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
          </React.Fragment>
          {usersInThisList?.map((item) => (
            <React.Fragment key={item?.id}>
              <RenderInPortal>
                <Tooltip parentElementId={`List-${item?.id}}`} content={`@${item?.name}`} delay={0.5} />
              </RenderInPortal>
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
            </React.Fragment>
          ))}
          {sessionUserOwnsList && (
            <>
              <RenderInPortal>
                <Tooltip parentElementId="List-tooltipAddUser" content="Add user" delay={0.5} />
              </RenderInPortal>
              <div className="List-headerPlusIcon" id="List-tooltipAddUser">
                <ListAddUser listId={list?.id} />
              </div>
            </>
          )}
          {sessionUserListRole === 'reader' && (
            <>
              <RenderInPortal>
                <Tooltip parentElementId="List-tooltipReader" content="Reader" delay={2} />
              </RenderInPortal>
              <Eye className="List-iconRole List-iconReader" id="List-tooltipReader" />
            </>
          )}
          {sessionUserListRole === 'editor' && (
            <>
              <RenderInPortal>
                <Tooltip parentElementId="List-tooltipEditor" content="Editor" delay={2} />
              </RenderInPortal>
              <EditCircle className="List-iconRole List-iconEditor" id="List-tooltipEditor" />
            </>
          )}
          {sessionUserListRole === 'admin' && (
            <>
              <RenderInPortal>
                <Tooltip parentElementId="List-tooltipAdmin" content="Edit list" delay={1} />
              </RenderInPortal>
              <EditCircle className="List-iconRole List-iconAdmin" id="List-tooltipAdmin" onClick={onEditClick} />
            </>
          )}
        </div>
      </div>
      <AnimateHeight className="List-notification" mounted={showBanner} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
        <div className="List-notificationText">You were invited to this list as {listInvitationRole}: join it?</div>
        {acceptLoading ? (
          <SpinnerPie />
        ) : (
          <Check className="List-notificationIcon List-notificationIconCheck" onClick={onInviteAccept} />
        )}
        {rejectLoading ? (
          <SpinnerPie />
        ) : (
          <Cross className="List-notificationIcon List-notificationIconCross" onClick={onInviteReject} />
        )}
      </AnimateHeight>
      <div className="List-header">
        <Select
          className="Bookmarks-select"
          label="Select tags"
          value={currentQueryParamFilterTags}
          defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
          options={[...tagsSearchFormatted, ...allTags.map((item) => ({ label: item.name, value: item.name }))].filter(
            (v, i, a) => a.findIndex((t) => t.value === v.value) === i
          )}
          onInputChange={onInputChange}
          onChange={onChange}
          maxItems={4}
          grow
          hideLabelOnFill
        />
        <SortBy
          options={[
            { label: 'Rating', field: 'vote', icon: Rating },
            { label: 'Bookmarks', field: 'timesbookmarked', icon: Bookmark },
            { label: 'Date', field: 'updatedAt', icon: Clock },
          ]}
          href={url}
          currentSort={sort}
          loading={bookmarksLoading}
        />
      </div>
      <div className="List-bookmarks">
        {bookmarksLoading ? (
          <BookmarkRowSkeletonGroup length={bookmarksIds?.length ?? DEFAULT_PAGE_SIZE} />
        ) : (
          bookmarksIds?.map((id) => <BookmarkRow id={id} listId={list?.id} key={id} />)
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
        titleHref={url}
        tagsPathname={`/lists/${list?.id}`}
      />
      <SidebarListUsers
        title="People in this list"
        users={!!listUserOwner ? [listUserOwner, ...usersInThisList] : usersInThisList}
        loading={usersInThisListLoading}
      />
    </Sidebar>
  </>
);

export const ListWithMemo = memo(List);
