import React from 'react';

import { Span } from '../Span';
import { IconSize, IconsType, SvgIcon } from '../Svg';

import './AIcon.less';

export type Size = 'normal' | 'small';

interface Props {
  className?: string;
  icon?: IconsType;
  size?: Size;
  children: React.ReactNode;
}

export const AIcon: React.FC<Props> = ({ className, children, icon = 'ArrowRight', size = 'normal' }) => {
  const svgSizeMap: {
    [key: string]: IconSize;
  } = {
    normal: 'small',
    small: 'micro',
  };

  return (
    <span className={'AIcon' + (className ? className : '')}>
      <Span bold size={size}>
        {children}
      </Span>
      {icon && <SvgIcon name={icon} size={svgSizeMap[size]} className="AIcon-svg" />}
    </span>
  );
};
