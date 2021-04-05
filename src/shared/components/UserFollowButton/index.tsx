import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
// import { DELAY_THREE_SEC } from '../../constants';
import { selectUserById } from '../../redux/modules/Users/selectors/selectUserById';
import { UserFollowButton as UserFollowButtonUi } from './UserFollowButton';

import './UserFollowButton.less';

interface Props {
  userId: string;
  className?: string;
}

export const UserFollowButton: React.FC<Props> = ({ userId, className }) => {
  // const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const session = useSelector(selectSession);
  const sessionUserFollowsUser = user?.followers?.some((item) => item === session?.id);
  const [recentlyChanged, setRecentlyChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onFollow = async () => {
    // if (!session?.id) return dispatch(switchLoginModal(true));
    // if (sessionUserFollowsUser) return;
    // await dispatch(listFollow({ listId: listId, userId: session?.id }));
    // setRecentlyChanged(true);
  };

  const onUnfollow = async () => {
    // if (!session?.id) return dispatch(switchLoginModal(true));
    // if (!sessionUserFollowsUser) return;
    // await dispatch(listUnfollow({ listId: listId, userId: session?.id }));
    // setRecentlyChanged(true);
  };

  const onMouseOut = async () => {
    // setRecentlyChanged(false);
  };

  useEffect(() => {
    // const recentlyChangedTimeout = setTimeout(() => {
    //   !recentlyChanged && setRecentlyChanged(false);
    // }, DELAY_THREE_SEC);
    // return () => {
    //   clearTimeout(recentlyChangedTimeout);
    // };
  }, [recentlyChanged]);

  return (
    <UserFollowButtonUi
      className={className}
      loading={loading}
      recentlyChanged={recentlyChanged}
      sessionUserFollowsUser={sessionUserFollowsUser}
      onMouseOut={onMouseOut}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
    />
  );
};

export default UserFollowButton;
