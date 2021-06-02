import React, { HTMLProps } from 'react';

import './Frame.less';

export type FramePadding = 'none' | 'small' | 'normal' | 'big';

interface Props extends HTMLProps<HTMLDivElement> {
  id?: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  weight?: 'none' | 'thick' | 'thin';
  shadow?: boolean;
  padding?: FramePadding;
  grow?: boolean;
}

export const Frame: React.FC<Props> = ({
  id,
  children,
  weight = 'thin',
  padding = 'normal',
  shadow = true,
  grow,
  className,
  ...props
}) => (
  <div
    id={id}
    className={
      (className ? className + ' ' : '') +
      'Frame' +
      (padding ? ' Frame-padding--' + padding : '') +
      (' Frame--' + weight) +
      (grow ? ' Frame--grow' : '') +
      (shadow ? ' Frame--shadow' : '')
    }
    {...props}
  >
    {children}
  </div>
);
