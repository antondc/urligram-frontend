import React from 'react';

import './CardItem.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const CardItem: React.FC<Props> = ({ children, className }) => (
  <div className={'CardItem' + (className ? ` ${className}` : '')}>{children}</div>
);

export default CardItem;
