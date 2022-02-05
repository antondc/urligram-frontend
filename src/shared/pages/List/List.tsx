import React, { memo } from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkFilled.svg';
import Cross from 'Assets/svg/cross.svg';
import ListIcon from 'Assets/svg/list.svg';
import PlusCircle from 'Assets/svg/plusCircle.svg';
import Clock from 'Assets/svg/spinner6.svg';
import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import ListAddUser from 'Components/ListAddUser';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import { RenderInPortal } from 'Components/Portal';
import SubHeader, { SubHeaderSeparator } from 'Components/SubHeader';
import { ListState, ListUser } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { AnimateHeight, Check, EditCircle, Eye, SelectValue, Spinner, Tooltip } from '@antoniodcorrea/components';

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
  onLeaveList: () => void;
  leaveListLoading: boolean;
}

const List: React.FC<Props> = ({
  listInvitationRole,
  sessionUserListRole,
  list,
  listUserOwner,
  sessionUserOwnsList,
  showBanner,
  bookmarksIds,
  bookmarksLoading,
  usersInThisList,
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
  onLeaveList,
  leaveListLoading,
}) => (
  <div className="List">
    <Helmet title={`${SITE_TITLE} · ${list?.name}`} />
    <AnimateHeight className="List-notification" mounted={showBanner} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
      <CardItem className="List-notificationContent">
        <div className="List-notificationText">You were invited to this list as {listInvitationRole}: join it?</div>
        {acceptLoading ? (
          <Spinner className="List-notificationLoader" />
        ) : (
          <Check className="List-notificationIcon List-notificationIconCheck" onClick={onInviteAccept} />
        )}
        {rejectLoading ? (
          <Spinner className="List-notificationLoader" />
        ) : (
          <Cross className="List-notificationIcon List-notificationIconCross" onClick={onInviteReject} />
        )}
      </CardItem>
    </AnimateHeight>
    <SubHeader
      // title props
      title={list?.name}
      leftIcon={<ListIcon />}
      // select props
      selectPlaceholder="Select tags"
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      selectDefaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
      selectOptions={[
        ...tagsSearchFormatted,
        ...allTags.map((item) => ({ label: item.name, value: item.name })),
      ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
      onSelectInputChange={onInputChange}
      onSelectChange={onChange}
      // sort props
      sortLoading={bookmarksLoading}
      sortByOptions={[
        { label: 'Bookmarked', field: 'timesbookmarked', icon: Bookmark },
        { label: 'Date', field: 'createdAt', icon: Clock },
      ]}
      url={url}
      currentSort={sort}
    >
      <SubHeaderSeparator />
      <div className="List-headerImages">
        <React.Fragment>
          <RenderInPortal>
            <Tooltip parentElementId="List-tooltipUserImage" content={`@${listUserOwner?.name}`} delay={2} />
          </RenderInPortal>
          <A
            className="List-headerImagesItem"
            href={`/users/${listUserOwner?.id}`}
            styled={false}
            frontend
            key={listUserOwner?.id}
            id="List-tooltipUserImage"
          >
            <img
              className="List-headerImagesItemImage"
              src={listUserOwner?.image?.['200w']}
              alt={listUserOwner?.name}
            />
          </A>
        </React.Fragment>
        {!!usersInThisList.length && (
          <div className="List-headerImagesJoined">
            {usersInThisList?.map((item) => (
              <React.Fragment key={item?.id}>
                <RenderInPortal>
                  <Tooltip parentElementId={`List-${item?.id}}`} content={`@${item?.name}`} delay={2} />
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
                  <img className="List-headerImagesItemImage" src={item.image?.['200w']} alt={item.name} />
                </A>
              </React.Fragment>
            ))}
          </div>
        )}
        {sessionUserOwnsList && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipAddUser" content="Add user" delay={2} />
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
        {sessionUserListRole === 'admin' && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipAdmin" content="Edit list" delay={2} />
            </RenderInPortal>
            <EditCircle className="List-iconRole List-iconAdmin" id="List-tooltipAdmin" onClick={onEditClick} />
          </>
        )}
        {sessionUserListRole && sessionUserListRole !== 'admin' && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipLeaveList" content="Leave list" delay={1} />
            </RenderInPortal>
            {leaveListLoading ? (
              <Spinner className="List-iconLeaveListLoader" />
            ) : (
              <PlusCircle
                className="List-iconRole List-iconLeaveList"
                id="List-tooltipLeaveList"
                onClick={onLeaveList}
              />
            )}
          </>
        )}
      </div>
    </SubHeader>
    <div className="List-bookmarks">
      {bookmarksLoading ? (
        <BookmarkRowSkeletonGroup length={bookmarksIds?.length ?? DEFAULT_PAGE_SIZE} />
      ) : (
        bookmarksIds?.map((id) => (
          <CardItem key={id}>
            <BookmarkRow id={id} listId={list?.id} />
          </CardItem>
        ))
      )}
      {!bookmarksLoading && !bookmarksIds?.length && <NoResults content="ⵁ We didnt find any bookmark." />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </div>
);

export const ListWithMemo = memo(List);
