import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { listLoadById } from 'Modules/Lists/actions/listLoadById';
import { listUserDelete } from 'Modules/Lists/actions/listUserDelete';
import { listUserUpsert } from 'Modules/Lists/actions/listUserUpsert';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { selectListUsers } from 'Modules/Lists/selectors/selectListUsers';
import { selectListUsersIds } from 'Modules/Lists/selectors/selectListUsersIds';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { usersLoadByIds } from 'Modules/Users/actions/usersLoadByIds';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { DELAY_FAST_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { URLWrapper } from '@antoniodcorrea/utils';
import { ListWithMemo as ListUI } from './List';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const { scrollBeforeCallback } = useScrollBeforeCallback();
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);
  const [leaveListLoading, setLeaveListLoading] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const session = useSelector(selectSession);
  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListById(state, { id: listId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const usersInThisListIds = useSelector((state: RootState) => selectListUsersIds(state, { listId }));
  const usersInThisList = useSelector((state: RootState) => selectListUsers(state, { listId }));
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const currentHref = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectBookmarksMetaSort);
  const sessionUserOwnsList = session?.id === list?.userId;
  const listUserOwner = useSelector((state: RootState) => selectUserById(state, { id: list?.userId }));
  const sessionUserInThisList = usersInThisList.find((item) => item.id === session?.id);
  const listInvitationRole = list?.members?.find((item) => item.id === session?.id)?.userRole;
  const sessionUserListRole = list?.userId === session?.id ? 'admin' : sessionUserInThisList?.userRole;
  const allTags = useSelector(selectTagsAll);
  const currentQueryParamFilter = useSelector(selectCurrentRouteQueryParamFilter);
  const tagsSearch = useSelector(selectTagsSearch);
  const currentQueryParamFilterTags =
    currentQueryParamFilter?.tags?.map((item) => ({
      label: item.toString(),
      value: item,
    })) || [];
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];

  const onInputChange = (string: string) => {
    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChange = (values) => {
    const tags: string[] = values?.map((item) => item.value);
    const myUrl = new URLWrapper(window.document.location.href);

    myUrl.upsertSearchParams({ filter: { tags } });
    myUrl.deleteSearchParam('page[offset]'); // Restart page on new search
    const redirectPath = myUrl.getPathAndSearch();

    scrollBeforeCallback(() => history.push(redirectPath));
  };

  const onInviteAccept = async () => {
    setAcceptLoading(true);
    await dispatch(listUserUpsert({ listId, userId: session?.id, userRole: sessionUserInThisList?.userRole }));
    setAcceptLoading(false);
    setTimeout(() => setShowBanner(false), DELAY_FAST_MS);
  };

  const onInviteReject = async () => {
    setRejectLoading(true);
    await dispatch(listUserDelete({ listId, userId: session?.id }));
    setRejectLoading(false);
    setTimeout(() => setShowBanner(false), DELAY_FAST_MS);
  };

  const onEditClick = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!listId) return;

    await dispatch(switchListModal({ mounted: true, listId }));
  };

  const onLeaveList = async () => {
    setLeaveListLoading(true);
    await dispatch(listUserDelete({ listId: list?.id, userId: session?.id }));
    setLeaveListLoading(false);
  };

  useEffect(() => {
    dispatch(listLoadById(listId));
  }, [session?.id]);

  useEffect(() => {
    !!listId && dispatch(bookmarksLoadByListId(listId));
  }, [currentHref, session?.id]);

  useEffect(() => {
    usersInThisListIds?.length && dispatch(usersLoadByIds(usersInThisListIds));
  }, [JSON.stringify(usersInThisListIds), session?.id]);

  useEffect(() => {
    !listUserOwner?.id && dispatch(userLoad(list?.userId));
  }, [list?.id]);

  useEffect(() => {
    // If the session member of this list is pending, display banner
    if (sessionUserInThisList?.userStatus === 'pending') setShowBanner(true);
  }, [sessionUserInThisList?.userStatus]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  if (!list) return null;

  return (
    <ListUI
      sessionUserListRole={sessionUserListRole}
      listInvitationRole={listInvitationRole}
      sessionUserOwnsList={sessionUserOwnsList}
      onInviteAccept={onInviteAccept}
      onInviteReject={onInviteReject}
      acceptLoading={acceptLoading}
      rejectLoading={rejectLoading}
      showBanner={showBanner}
      list={list}
      listUserOwner={listUserOwner}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      usersInThisList={usersInThisList}
      page={page}
      totalItems={totalItems}
      currentHref={currentHref}
      sort={sort}
      onEditClick={onEditClick}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onChange={onChange}
      onInputChange={onInputChange}
      onLeaveList={onLeaveList}
      leaveListLoading={leaveListLoading}
    />
  );
};

export default List;
