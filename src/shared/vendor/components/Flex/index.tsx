import React, { HTMLProps } from 'react';

import './Flex.less';

export type FlexHorizontal = 'center' | 'right' | 'left' | 'even' | 'around' | 'between';
export type FlexVertical = 'center' | 'top' | 'bottom' | 'baseline';

interface Props extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  horizontal?: FlexHorizontal;
  vertical?: FlexVertical;
  noWrap?: boolean;
  growVertical?: boolean;
  growHorizontal?: boolean;
}

export const Flex: React.FC<Props> = ({
  children,
  className,
  horizontal,
  vertical,
  noWrap,
  growVertical = true,
  growHorizontal = true,
  ...props
}) => (
  <div
    className={
      'Flex' +
      (horizontal ? ' Flex-horizontal--' + horizontal : '') +
      (vertical ? ' Flex-vertical--' + vertical : '') +
      (!!noWrap ? ' Flex-noWrap' : '') +
      (!!growVertical ? ' Flex-growVertical' : '') +
      (!!growHorizontal ? ' Flex-growHorizontal' : '') +
      (!!className ? ' ' + className : '')
    }
    {...props}
  >
    {children}
  </div>
);
