import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiNotificationViewed } from 'Modules/Ui/actions/uiNotificationViewed';
import { NotificationState, NotificationType } from 'Modules/Ui/ui.types';
import { DELAY_FIVE_SEC } from 'Root/src/shared/constants';
import { Notification } from '@antoniodcorrea/components';
import ConnectionAddedFailed from '.';
import BookmarkAddedToList from './BookmarkAddedToList';
import BookmarkCreated from './BookmarkCreated';
import BookmarkDeleted from './BookmarkDeleted';
import BookmarkGrabbed from './BookmarkGrabbed';
import BookmarkNotAddedToList from './BookmarkNotAddedToList';
import BookmarkNotRemovableFromList from './BookmarkNotRemovableFromList';
import BookmarkPrivateLimitReached from './BookmarkPrivateLimitReached';
import BookmarkRemovedFromList from './BookmarkRemovedFromList';
import ConnectionAdded from './ConnectionAdded';
import ConnectionRemoved from './ConnectionRemoved';
import ConnectionRemovedFailed from './ConnectionRemovedFailed';
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
        {notification?.type === NotificationType.BookmarkCreation && <BookmarkCreated notification={notification} />}
        {notification?.type === NotificationType.BookmarkDeleted && <BookmarkDeleted notification={notification} />}
        {notification?.type === NotificationType.LinkVoted && <LinkVoted notification={notification} />}
        {notification?.type === NotificationType.BookmarkNorRemovableFromList && <BookmarkNotRemovableFromList />}
        {notification?.type === NotificationType.BookmarkAddedToList && <BookmarkAddedToList />}
        {notification?.type === NotificationType.BookmarkRemovedFromList && <BookmarkRemovedFromList />}
        {notification?.type === NotificationType.BookmarkNotAddedToList && <BookmarkNotAddedToList />}
        {notification?.type === NotificationType.ConnectionAdded && <ConnectionAdded notification={notification} />}
        {notification?.type === NotificationType.ConnectionAddedFailed && (
          <ConnectionAddedFailed notification={notification} />
        )}
        {notification?.type === NotificationType.ConnectionRemoved && <ConnectionRemoved notification={notification} />}
        {notification?.type === NotificationType.ConnectionRemovedFailed && (
          <ConnectionRemovedFailed notification={notification} />
        )}
        {notification?.type === NotificationType.BookmarkPrivateLimitReached && (
          <BookmarkPrivateLimitReached notification={notification} />
        )}
      </Notification>
    </div>
  );
};

export default BaseNotification;
