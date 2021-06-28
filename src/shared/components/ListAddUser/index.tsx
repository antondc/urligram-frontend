import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listUserDelete } from 'Modules/Lists/actions/listUserDelete';
import { listUserUpsert } from 'Modules/Lists/actions/listUserUpsert';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { listAddUserMount } from 'Modules/Ui/actions/listAddUserMount';
import { listAddUserUnMount } from 'Modules/Ui/actions/listAddUserUnMount';
import { selectListAddUserModalMounted } from 'Modules/Ui/selectors/selectListAddUserModalMounted';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectUsersByIds } from 'Modules/Users/selectors/selectUsersByIds';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { ListAddUser as ListAddUserUi } from './ListAddUser';

interface Props {
  listId: number;
}

export const ListAddUser: React.FC<Props> = ({ listId }) => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const list = useSelector((state: RootState) => selectListById(state, { id: listId }));
  const [itemsLoadingReader, setItemsLoadingReader] = useState<string[]>([]);
  const [itemsLoadingEditor, setItemsLoadingEditor] = useState<string[]>([]);
  const [itemsLoadingRemove, setItemsLoadingRemove] = useState<string[]>([]);
  const listAddUserModalMounted = useSelector(selectListAddUserModalMounted);
  const [readerRecentlyUpdated, setReaderRecentlyUpdated] = useState<string[]>([]);
  const [editorRecentlyUpdated, setEditorRecentlyUpdated] = useState<string[]>([]);
  const [deleteRecentlyUpdated, setDeleteRecentlyUpdated] = useState<string[]>([]);
  const [inList, setInList] = useState<boolean>(false);
  const user = useSelector((state: RootState) => selectUserById(state, { id: session?.id }));
  const followingUsers = useSelector((state: RootState) => selectUsersByIds(state, { userIds: user?.following }));

  const onListEnter = () => {
    setInList(true);
  };

  const onListLeave = () => {
    if (itemsLoadingReader?.length || itemsLoadingEditor?.length) return;

    dispatch(listAddUserUnMount());
    setInList(false);
  };

  const onListsClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // !!listAddUserModalMounted && dispatch(listAddUserUnMount());
    !listAddUserModalMounted && dispatch(listAddUserMount());
  };

  const onInviteAsReader = async (userId: string) => {
    setItemsLoadingReader([...itemsLoadingReader, userId]);
    await dispatch(listUserUpsert({ listId: list?.id, userId, userRole: 'reader' }));
    setItemsLoadingReader(itemsLoadingReader.filter((item) => item !== userId));
    setReaderRecentlyUpdated([...readerRecentlyUpdated, userId]);
  };

  const onInviteAsEditor = async (userId: string) => {
    setItemsLoadingEditor([...itemsLoadingEditor, userId]);
    await dispatch(listUserUpsert({ listId: list?.id, userId, userRole: 'editor' }));
    setItemsLoadingEditor(itemsLoadingEditor.filter((item) => item !== userId));
    setEditorRecentlyUpdated([...editorRecentlyUpdated, userId]);
  };

  const onRemoveFromList = async (userId: string) => {
    const confirmedDelete = confirm('Are you sure you want to remove this user from this list?');
    if (!confirmedDelete) return;

    setItemsLoadingRemove([...itemsLoadingEditor, userId]);
    await dispatch(listUserDelete({ listId: list?.id, userId }));
    setItemsLoadingRemove(itemsLoadingEditor.filter((item) => item !== userId));
    setDeleteRecentlyUpdated([...editorRecentlyUpdated, userId]);
  };

  const onIconReaderLeave = async (userId) => {
    setReaderRecentlyUpdated(readerRecentlyUpdated?.filter((item) => item !== userId));
  };

  const onIconEditorLeave = async (userId) => {
    setEditorRecentlyUpdated(editorRecentlyUpdated?.filter((item) => item !== userId));
  };

  useEffect(() => {
    const unMountTimeout = setTimeout(() => {
      !inList && !!listAddUserModalMounted && dispatch(listAddUserUnMount());
    }, DELAY_THREE_SEC);

    return () => {
      clearTimeout(unMountTimeout);
    };
  }, [listAddUserModalMounted, inList]);

  return (
    <ListAddUserUi
      sessionId={session?.id}
      list={list}
      mounted={listAddUserModalMounted}
      onListLeave={onListLeave}
      onListEnter={onListEnter}
      onListsClick={onListsClick}
      onInviteAsReader={onInviteAsReader}
      onInviteAsEditor={onInviteAsEditor}
      onRemoveFromList={onRemoveFromList}
      followingUsers={followingUsers}
      itemsLoadingReader={itemsLoadingReader}
      itemsLoadingEditor={itemsLoadingEditor}
      itemsLoadingRemove={itemsLoadingRemove}
      readerRecentlyUpdated={readerRecentlyUpdated}
      editorRecentlyUpdated={editorRecentlyUpdated}
      deleteRecentlyUpdated={deleteRecentlyUpdated}
      onIconReaderLeave={onIconReaderLeave}
      onIconEditorLeave={onIconEditorLeave}
    />
  );
};

export default ListAddUser;
