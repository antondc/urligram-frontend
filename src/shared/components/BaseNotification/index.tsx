import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiNotificationViewed } from 'Modules/Ui/actions/uiNotificationViewed';
import { NotificationState } from 'Modules/Ui/ui.types';
import { Hr, Notification } from '@antoniodcorrea/components';
import { DELAY_SIX_SEC } from '../../constants';
import BookmarkDeleted from './BookmarkDeleted';
import BookmarkGrabbed from './BookmarkGrabbed';

import './BaseNotification.less';

interface Props {
  notification: NotificationState;
}

const BaseNotification: React.FC<Props> = ({ notification }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiNotificationViewed(notification));
    }, DELAY_SIX_SEC);
  }, []);

  const onCloseClick = () => {
    dispatch(uiNotificationViewed(notification));
  };

  return (
    <div>
      <div className="BaseNotification" id={'BaseNotification--' + notification.id}>
        <Notification onCloseClick={onCloseClick} type={notification.style}>
          {notification?.type === 'bookmark-grabbed' && <BookmarkGrabbed notification={notification} />}
          {notification?.type === 'bookmark-deleted' && <BookmarkDeleted notification={notification} />}
        </Notification>
      </div>
      <Hr spacer size="small" />
    </div>
  );
};

export default BaseNotification;
