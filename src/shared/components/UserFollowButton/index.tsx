import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userFollowCreate } from 'Modules/Users/actions/userFollowCreate';
import { userFollowDelete } from 'Modules/Users/actions/userFollowDelete';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { UserFollowButton as UserFollowButtonUi } from './UserFollowButton';

import './UserFollowButton.less';

interface Props {
  userId: string;
  className?: string;
}

const UserFollowButton: React.FC<Props> = ({ userId, className }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const session = useSelector(selectSession);
  const sessionUserFollowsUser = user?.followers?.some((item) => item === session?.id);
  const [recentlyChanged, setRecentlyChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const displayButton = !!session?.id && user?.id !== session?.id;

  const onFollow = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (sessionUserFollowsUser) return;
    setLoading(true);
    await dispatch(userFollowCreate({ targetUserId: user?.id, originUserId: session?.id }));
    setRecentlyChanged(true);
    setLoading(false);
  };

  const onUnfollow = async () => {
    if (!session?.id) return dispatch(switchLoginModal(true));
    if (!sessionUserFollowsUser) return;
    setLoading(true);
    await dispatch(userFollowDelete({ originUserId: session?.id, targetUserId: user?.id }));
    setRecentlyChanged(true);
    setLoading(false);
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

  if (!displayButton) return <></>;

  return (
    <UserFollowButtonUi
      className={className}
      userId={userId}
      userName={user?.name}
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
