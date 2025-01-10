import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectSessionUser } from 'Modules/Session/selectors/selectSessionUser';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import { NotificationStatus, NotificationStyle, NotificationType } from 'Modules/Ui/ui.types';
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
  const sessionUser = useSelector(selectSessionUser);
  const sessionUserFollowsUser = sessionUser?.following?.some((item) => item === userId);
  const [recentlyChanged, setRecentlyChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const displayButton = !!sessionUser?.id && user?.id !== sessionUser?.id;

  const onFollow = async () => {
    if (!sessionUser?.id) return dispatch(switchLoginModal(true));
    if (sessionUserFollowsUser) return;
    setLoading(true);
    try {
      await dispatch(userFollowCreate({ targetUserId: user?.id, originUserId: sessionUser?.id }));
      dispatch(
        uiNotificationPush({
          userId,
          type: NotificationType.ConnectionAdded,
          style: NotificationStyle.Success,
          status: NotificationStatus.Pending,
        })
      );
      setRecentlyChanged(true);
    } catch (e) {
      dispatch(
        uiNotificationPush({
          userId,
          type: NotificationType.ConnectionAddedFailed,
          style: NotificationStyle.Error,
          status: NotificationStatus.Pending,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const onUnfollow = async () => {
    if (!sessionUser?.id) return dispatch(switchLoginModal(true));
    if (!sessionUserFollowsUser) return;
    setLoading(true);

    try {
      await dispatch(userFollowDelete({ originUserId: sessionUser?.id, targetUserId: user?.id }));

      dispatch(
        uiNotificationPush({
          userId,
          type: NotificationType.ConnectionRemoved,
          style: NotificationStyle.Alert,
          status: NotificationStatus.Pending,
        })
      );
      setRecentlyChanged(true);
    } catch (error) {
      await dispatch(
        uiNotificationPush({
          userId,
          type: NotificationType.ConnectionRemovedFailed,
          style: NotificationStyle.Error,
          status: NotificationStatus.Pending,
        })
      );
    } finally {
      setLoading(false);
    }
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
