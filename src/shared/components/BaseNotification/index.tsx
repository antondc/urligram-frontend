import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiNotificationViewed } from 'Modules/Ui/actions/uiNotificationViewed';
import { NotificationState } from 'Modules/Ui/ui.types';
import { DELAY_THREE_SEC } from 'Root/src/shared/constants';
import { Notification } from 'Vendor/components';
import BookmarkDeleted from './BookmarkDeleted';
import BookmarkGrabbed from './BookmarkGrabbed';
import LinkVoted from './LinkVoted';

import './BaseNotification.less';

interface Props {
  notification: NotificationState;
}

const BaseNotification: React.FC<Props> = ({ notification }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiNotificationViewed(notification));
    }, DELAY_THREE_SEC);
  }, []);

  const onCloseClick = () => {
    dispatch(uiNotificationViewed(notification));
  };

  return (
    <div className="BaseNotification" id={'BaseNotification--' + notification.id}>
      <Notification onCloseClick={onCloseClick} type={notification.style}>
        {notification?.type === 'bookmark-grabbed' && <BookmarkGrabbed notification={notification} />}
        {notification?.type === 'bookmark-deleted' && <BookmarkDeleted notification={notification} />}
        {notification?.type === 'link-voted' && <LinkVoted notification={notification} />}
      </Notification>
    </div>
  );
};

export default BaseNotification;
