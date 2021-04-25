import React from 'react';

import { Cross } from '../Svg';

import './Notification.less';

export type NotificationType = 'success' | 'error' | 'alert';
export type NotificationSize = 'small' | 'normal' | 'big';

interface Props {
  className?: string;
  id?: string;
  type?: NotificationType;
  size?: NotificationSize;
  onCloseClick?: () => void;
}

export const Notification: React.FC<Props> = ({
  children,
  className,
  id,
  type = 'alert',
  size = 'normal',
  onCloseClick,
}) => (
  <div
    className={
      'Notification' +
      (' Notification-' + size) +
      (type ? ' Notification--' + type : '') +
      (className ? ' ' + className : '')
    }
    id={id}
  >
    {children}
    <div className="Notification-remove" onClick={onCloseClick}>
      <Cross size="small" />
    </div>
  </div>
);
