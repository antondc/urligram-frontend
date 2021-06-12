import React, { HTMLProps } from 'react';

import './Hr.less';

export type HrSize = 'zero' | 'nano' | 'micro' | 'small' | 'normal' | 'big';

interface Props extends Omit<HTMLProps<HTMLHRElement>, 'size'> {
  className?: string;
  spacer?: boolean;
  size?: HrSize;
}

export const Hr: React.FC<Props> = ({ spacer = false, size = 'normal', className, ...props }) => (
  <hr
    className={'Hr' + (spacer ? ' Hr-spacer' : '') + (size ? ' Hr-' + size : '') + (className ? ' ' + className : '')}
    {...props}
  />
);
