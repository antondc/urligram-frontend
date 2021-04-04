import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listFollow } from 'Modules/Lists/actions/listFollow';
import { listUnfollow } from 'Modules/Lists/actions/listUnfollow';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { selectListLoading } from 'Modules/Lists/selectors/selectListLoading';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { DELAY_THREE_SEC } from '../../constants';
import { ListFollowButton as ListFollowButtonUi } from './ListFollowButton';

import './ListFollowButton.less';

interface Props {
  listId: number;
  className?: string;
  id?: string;
}

export const ListFollowButton: React.FC<Props> = ({ listId, className, id }) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => selectListById(state, { id: listId }));
  const session = useSelector(selectSession);
  const listLoading = useSelector((state: RootState) => selectListLoading(state, { id: listId }));
  const sessionUserFollowsList = list?.members?.some((item) => item.id === session?.id);
  const sessionUserOwnsList = list?.userId === session?.id;
  const [recentlyChanged, setRecentlyChanged] = useState<boolean>(false);

  const onEdit = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));

    await dispatch(switchListModal({ mounted: true, listId: list?.id }));
  };

  const onFollowList = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (sessionUserFollowsList) return;
    await dispatch(listFollow({ listId: listId, userId: session?.id }));
    setRecentlyChanged(true);
  };

  const onUnfollowList = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!sessionUserFollowsList) return;
    await dispatch(listUnfollow({ listId: listId, userId: session?.id }));
    setRecentlyChanged(true);
  };

  const onMouseOut = async () => {
    setRecentlyChanged(false);
  };

  useEffect(() => {
    const recentlyChangedTimeout = setTimeout(() => {
      !recentlyChanged && setRecentlyChanged(false);
    }, DELAY_THREE_SEC);

    return () => {
      clearTimeout(recentlyChangedTimeout);
    };
  }, [recentlyChanged]);

  return (
    <ListFollowButtonUi
      id={id}
      image={session?.image}
      loading={listLoading}
      onEdit={onEdit}
      recentlyChanged={recentlyChanged}
      onMouseOut={onMouseOut}
      onFollowList={onFollowList}
      onUnfollowList={onUnfollowList}
      className={className}
      sessionUserOwnsList={sessionUserOwnsList}
      sessionUserFollowsList={sessionUserFollowsList}
    />
  );
};

export default ListFollowButton;
