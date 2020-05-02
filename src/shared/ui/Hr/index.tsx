import React from 'react';
import './Hr.less';

export type HrType = 'spacer' | 'shrink';
export type HrSize = 'zero' | 'nano' | 'micro' | 'small' | 'normal' | 'big';

interface Props {
  type?: HrType;
  size?: HrSize;
}

const Hr: React.FC<Props> = ({ type, size = 'normal' }) => (
  <hr className={'Hr' + (type ? ' Hr-' + type : '') + (size ? ' Hr-' + size : '')} />
);

export default Hr;
