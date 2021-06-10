import React, { HTMLProps } from 'react';

import { NotificationDot } from '../NotificationDot';
import { Span, SpanWeight } from '../Span';

import './Tag.less';

export type NotificationDot = 'success' | 'error' | 'alert';
export type Size = 'small' | 'medium' | 'big';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children: string | React.ReactNode | React.ReactNode[];
  className?: string;
  size?: 'small' | 'medium' | 'big' | 'nano';
  variant?: 'dark' | 'simple';
  notification?: NotificationDot;
}

export const Tag: React.FC<Props> = ({
  children,
  size = 'small',
  variant = 'simple',
  notification,
  className,
  ...props
}) => {
  const sizeMap = {
    nano: 'nano',
    small: 'micro',
    medium: 'small',
  };

  const boldMap: {
    [key: string]: SpanWeight;
  } = {
    nano: 'bold',
    small: 'bold',
    medium: 'extraBold',
    big: 'extraBold',
  };

  return (
    <div
      className={
        'Tag ' + (size ? 'Tag--' + size : '') + (variant ? ' Tag--' + variant : '') + (className ? ' ' + className : '')
      }
      {...props}
    >
      <NotificationDot className="Tag-notification" type={notification} size="small" />
      <div className="Tag-content">
        <Span weight={boldMap[size]} size={sizeMap[size]}>
          {children}
        </Span>
      </div>
    </div>
  );
};
