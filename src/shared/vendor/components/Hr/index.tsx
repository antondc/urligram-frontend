import React, { HTMLProps } from 'react';

import './Hr.less';

export type HrSize = 'zero' | 'nano' | 'micro' | 'small' | 'normal' | 'big';

interface Props extends Omit<HTMLProps<HTMLHRElement>, 'size'> {
  spacer?: boolean;
  size?: HrSize;
}

export const Hr: React.FC<Props> = ({ spacer = false, size = 'normal', ...props }) => (
  <hr className={'Hr' + (spacer ? ' Hr-spacer' : '') + (size ? ' Hr-' + size : '')} {...props} />
);
