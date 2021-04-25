import React, { HTMLProps } from 'react';

import './Border.less';

export type BorderPadding = 'small' | 'normal' | 'big';

interface Props extends HTMLProps<HTMLDivElement> {
  id?: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  weight?: 'thick' | 'thin';
  padding?: BorderPadding;
  grow?: boolean;
}

export const Border: React.FC<Props> = ({
  id,
  children,
  weight = 'thin',
  padding = 'normal',
  grow,
  className,
  ...props
}) => (
  <div
    id={id}
    className={
      (className ? className + ' ' : '') +
      'Border' +
      (padding ? ' Border-padding--' + padding : '') +
      (' Border--' + weight) +
      (grow ? ' Border--grow' : '')
    }
    {...props}
  >
    {children}
  </div>
);
