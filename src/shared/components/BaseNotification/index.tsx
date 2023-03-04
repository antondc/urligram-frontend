import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiNotificationViewed } from 'Modules/Ui/actions/uiNotificationViewed';
import { NotificationState, NotificationType } from 'Modules/Ui/ui.types';
import { DELAY_FIVE_SEC } from 'Root/src/shared/constants';
import { Notification } from '@antoniodcorrea/components';
import BookmarkDeleted from './BookmarkDeleted';
import BookmarkGrabbed from './BookmarkGrabbed';
import BookmarkPrivateLimitReached from './BookmarkPrivateLimitReached';
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
    }, DELAY_FIVE_SEC);
  }, []);

  const onCloseClick = () => {
    dispatch(uiNotificationViewed(notification));
  };

  return (
    <div className="BaseNotification" id={'BaseNotification--' + notification.id}>
      <Notification onCloseClick={onCloseClick} type={notification.style}>
        {notification?.type === NotificationType.BookmarkGrabbed && <BookmarkGrabbed notification={notification} />}
        {notification?.type === NotificationType.BookmarkDeleted && <BookmarkDeleted notification={notification} />}
        {notification?.type === NotificationType.LinkVoted && <LinkVoted notification={notification} />}
        {notification?.type === NotificationType.BookmarkPrivateLimitReached && (
          <BookmarkPrivateLimitReached notification={notification} />
        )}
      </Notification>
    </div>
  );
};

export default BaseNotification;
