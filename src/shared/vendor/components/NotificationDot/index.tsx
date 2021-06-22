import React from 'react';

import './NotificationDot.less';

export type NotificationDotType = 'success' | 'error' | 'alert';
export type NotificationDotSize = 'small' | 'normal' | 'big';

interface Props {
  className?: string;
  type?: NotificationDotType;
  size?: NotificationDotSize;
  onClick?: () => void;
}

export const NotificationDot: React.FC<Props> = ({ className, type, size = 'normal', onClick }) => (
  <div
    className={
      'NotificationDot' +
      (' NotificationDot-' + size) +
      (type ? ' NotificationDot--' + type : '') +
      (className ? ' ' + className : '')
    }
    onClick={onClick}
  />
);
