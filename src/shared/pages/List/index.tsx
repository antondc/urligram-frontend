import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkLoadByIds } from 'Modules/Bookmarks/actions/bookmarksLoadByIds';
import { bookmarksLoadByListId } from 'Modules/Bookmarks/actions/bookmarksLoadByListId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { listLoadById } from 'Modules/Lists/actions/listLoadById';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { listUserDelete } from 'Modules/Lists/actions/listUserDelete';
import { listUserUpsert } from 'Modules/Lists/actions/listUserUpsert';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamListId } from 'Modules/Routes/selectors/selectCurrentRouteParamListId';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsTagsInThisListLoad } from 'Modules/Sections/actions/sectionsTagsInThisListLoad';
import { sectionsUsersInThisListLoad } from 'Modules/Sections/actions/sectionsUsersInThisListLoad';
import { selectUsersInThisList } from 'Modules/Sections/selectors/selectUsersInThisList';
import { selectUsersInThisListIds } from 'Modules/Sections/selectors/selectUsersInThisListIds';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { DELAY_FAST_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { ListWithMemo as ListUI } from './List';

const List: React.FC = () => {
  const dispatch = useDispatch();

  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const session = useSelector(selectSession);
  const listId = useSelector(selectCurrentRouteParamListId);
  const list = useSelector((state: RootState) => selectListById(state, { id: listId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const usersInThisListIds = useSelector((state: RootState) => selectUsersInThisListIds(state, { listId }));
  const usersInThisList = useSelector((state: RootState) => selectUsersInThisList(state, { listId }));
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);
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

    history.push(redirectPath);
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
    // loadMainContent();
  };

  useEffect(() => {
    dispatch(listLoadById(listId));
    dispatch(listsLoadByUserId({ userId: session?.id }));
  }, [session?.id]);

  useEffect(() => {
    !!listId && dispatch(bookmarksLoadByListId(listId));
    dispatch(sectionsTagsInThisListLoad(listId));
  }, [url, session?.id]);

  useEffect(() => {
    usersInThisListIds?.length && dispatch(sectionsUsersInThisListLoad(usersInThisListIds));
  }, [JSON.stringify(usersInThisListIds), session?.id]);

  useEffect(() => {
    !listUserOwner?.id && dispatch(userLoad(list?.userId));
  }, [list?.id]);

  useEffect(() => {
    dispatch(bookmarkLoadByIds({ ids: list?.bookmarksIds }));
  }, [JSON.stringify(list?.bookmarksIds)]);

  useEffect(() => {
    // If the session member of this list is pending, display banner
    if (sessionUserInThisList?.userStatus === 'pending') setShowBanner(true);
  }, [sessionUserInThisList?.userStatus]);

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
      url={url}
      sort={sort}
      onEditClick={onEditClick}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
};

export default List;
