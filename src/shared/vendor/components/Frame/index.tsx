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
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
}

export const Frame: React.FC<Props> = ({
  id,
  children,
  weight = 'thin',
  padding = 'normal',
  shadow,
  grow,
  className,
  borderTop = true,
  borderRight = true,
  borderBottom = true,
  borderLeft = true,
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
      (shadow ? ' Frame--shadow' : '') +
      (borderTop ? ' Frame--borderTop' : '') +
      (borderRight ? ' Frame--borderRight' : '') +
      (borderBottom ? ' Frame--borderBottom' : '') +
      (borderLeft ? ' Frame--borderLeft' : '')
    }
    {...props}
  >
    {children}
  </div>
);
