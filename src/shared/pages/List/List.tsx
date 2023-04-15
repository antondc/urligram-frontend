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
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ListState, ListUser, ListUserRole, ListUserStatus } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { AnimateHeight, Check, EditCircle, Eye, Img, SelectValue, Spinner, Tooltip } from '@antoniodcorrea/components';

import './List.less';

interface Props {
  glossary: GlossaryState;
  showBanner: boolean;
  listInvitationRole: ListUserRole;
  sessionUserListRole: ListUserRole;
  list: ListState;
  listUserOwner: UserState;
  sessionUserOwnsList: boolean;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  usersInThisList: ListUser[];
  currentHref: string;
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
  glossary,
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
  currentHref,
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
    <Helmet>
      <title>{`${SITE_TITLE} · ${list?.name}`}</title>
      <meta property="og:title" content={`${SITE_TITLE} · ${list?.name}`} />
      <meta property="og:url" content={currentHref} />
      <meta property="twitter:title" content={`${SITE_TITLE} · ${list?.name}`} />
      <meta property="twitter:url" content={currentHref} />
    </Helmet>
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
      selectPlaceholder={glossary.selectTags}
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
        { label: glossary.bookmarked, field: 'timesbookmarked', icon: Bookmark },
        { label: glossary.created, field: 'createdAt', icon: Clock },
      ]}
      url={currentHref}
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
            <Img
              className="List-headerImagesItemImage"
              src={listUserOwner?.image?.['200w']}
              alt={listUserOwner?.name}
              title={listUserOwner?.name}
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
                    (item?.userStatus === ListUserStatus.Pending
                      ? ' List-headerImagesItemJoined--pending'
                      : ' List-headerImagesItemJoined--active')
                  }
                  id={`List-${item?.id}}`}
                  href={`/users/${item?.id}`}
                  styled={false}
                  key={item?.id}
                  frontend
                >
                  <Img
                    className="List-headerImagesItemImage"
                    src={item.image?.['200w']}
                    alt={item.name}
                    title={item.name}
                  />
                </A>
              </React.Fragment>
            ))}
          </div>
        )}
        {sessionUserOwnsList && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipAddUser" content={glossary.addUser} delay={2} />
            </RenderInPortal>
            <div className="List-headerPlusIcon" id="List-tooltipAddUser">
              <ListAddUser listId={list?.id} />
            </div>
          </>
        )}
        {sessionUserListRole === ListUserRole.Reader && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipReader" content="Reader" delay={2} />
            </RenderInPortal>
            <Eye className="List-iconRole List-iconReader" id="List-tooltipReader" />
          </>
        )}
        {sessionUserListRole === ListUserRole.Admin && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipAdmin" content={glossary.editList} delay={2} />
            </RenderInPortal>
            <EditCircle className="List-iconRole List-iconAdmin" id="List-tooltipAdmin" onClick={onEditClick} />
          </>
        )}
        {sessionUserListRole && sessionUserListRole !== ListUserRole.Admin && (
          <>
            <RenderInPortal>
              <Tooltip parentElementId="List-tooltipLeaveList" content={glossary.leaveList} delay={1} />
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
      {!bookmarksLoading && !bookmarksIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyBookmark}.`} />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={currentHref} />
  </div>
);

export const ListWithMemo = memo(List);
