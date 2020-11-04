import React from 'react';

import './Notification.less';

export type NotificationType = 'success' | 'error' | 'alert';
export type NotificationSize = 'small' | 'normal' | 'big';

interface Props {
  className?: string;
  type?: NotificationType;
  size?: NotificationSize;
}

const Notification: React.FC<Props> = ({ className, type, size = 'normal' }) => (
  <div
    className={
      'Notification' +
      (' Notification-' + size) +
      (type ? ' Notification--' + type : '') +
      (className ? ' ' + className : '')
    }
  />
);

export default Notification;
